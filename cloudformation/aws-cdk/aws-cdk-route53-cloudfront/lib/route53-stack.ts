import cdk = require('@aws-cdk/core');
import r53 = require('@aws-cdk/aws-route53');
import { DnsValidatedCertificate } from "@aws-cdk/aws-certificatemanager";
import { CloudFrontTarget } from '@aws-cdk/aws-route53-targets';
import { CloudFrontWebDistribution, SSLMethod, SecurityPolicyProtocol } from '@aws-cdk/aws-cloudfront';
import { IBucket } from '@aws-cdk/aws-s3';
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment';
import { BucketStack } from "./s3-stack";
import MultiStackProps from './config/combined-stack-properties';
import ZoneUtils from "./util/zone-utils";

export class Route53MultiStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: MultiStackProps) {
    super(scope, id, props);

    if (!props || !props.primaryHostedZoneName) {
      console.error('Given stack properties do not contain valid parameters.');
      return;
    }

    const bucketStack: BucketStack = new BucketStack(this, 'NestedBucketStack', props);
    props.userBucket = bucketStack.bucket;

    if (props.usePredefinedZone) {
      this.buildStackWithPredefinedZone(props);
    } else {
      // create a new HostedZone for a sub domain (of a tld managed otherwise)
      const zone = new r53.PublicHostedZone(this, 'HostedZone-test', {
        zoneName: `test-zone.${props.primaryHostedZoneName}`
      });
      // ...add NS records from new hosted zone to existing hosted zone managing the tld
      let hostedZoneId = zone.hostedZoneId;
    }
  }

  /*
   * Builds a Static Site for a predefined public hosted zone with a new sub domain.
   */
  buildStackWithPredefinedZone(props: MultiStackProps) {

    if (!props.userBucket || !props.primaryHostedZoneName || !props.siteDomain) {
      console.error('Given stack properties do not contain valid parameters.');
      return;
    }

    // determine the existing hosted zone
    const zone: r53.IHostedZone = ZoneUtils.determineHostedZone(this, props.primaryHostedZoneName);
    new cdk.CfnOutput(this, 'Zone', { value: zone.zoneName });
    new cdk.CfnOutput(this, 'Site', { value: 'https://' + props.siteDomain });

    // TODO in CDK v1.15.0 there is an known issue with the region parameter not recognized, limiting the stack to us-east-1
    const certificate: DnsValidatedCertificate = new DnsValidatedCertificate(this, 'SiteCertificate', {
      domainName: props.siteDomain,
      hostedZone: zone,
      region: 'us-east-1'
    });
    new cdk.CfnOutput(this, 'Certificate', { value: certificate.certificateArn });

    // CloudFront distribution that provides HTTPS
    const distribution: CloudFrontWebDistribution = this.buildCloudfrontDistribution(
      props.siteDomain,
      certificate.certificateArn,
      props.userBucket);
    new cdk.CfnOutput(this, 'DistributionId', { value: distribution.distributionId });

    // deploy bucket content in Cloudfront distribution context
    this.deployContentToBucket(props.userBucket, distribution);

    // Route53 alias record for the CloudFront distribution
    const aRecord: r53.ARecord = this.buildAliasRecord(zone, props.siteDomain, distribution);
    new cdk.CfnOutput(this, 'AliasRecord', { value: aRecord.domainName });

    let cname: string = `www.${props.siteDomain}`;
    const cnameRecord: r53.CnameRecord = this.buildCnameRecord(zone, props.siteDomain, cname);
    new cdk.CfnOutput(this, 'CnameRecord', { value: aRecord.domainName });
  }

  buildCnameRecord(zone: r53.IHostedZone, siteName: string, recordName: string): r53.CnameRecord {
    const recordProps: r53.CnameRecordProps = {
      zone: zone,
      recordName: recordName,
      domainName: siteName,
      ttl: cdk.Duration.minutes(5),
    };
    return new r53.CnameRecord(this, "SiteCnameRecord", recordProps);
  }

  buildAliasRecord(zone: r53.IHostedZone, recordName: string, distribution: CloudFrontWebDistribution): r53.ARecord {
    const recordProps: r53.ARecordProps = {
      zone: zone,
      recordName: recordName,
      target: r53.RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      ttl: cdk.Duration.minutes(5)
    };
    return new r53.ARecord(this, "SiteAliasRecord", recordProps);
  }

  buildCloudfrontDistribution(siteDomain: string, certificateArn: string, bucket: IBucket): CloudFrontWebDistribution {
    return new CloudFrontWebDistribution(this, 'SiteDistribution', {
      aliasConfiguration: {
        acmCertRef: certificateArn,
        names: [siteDomain], //, `www.${siteDomain}`],
        sslMethod: SSLMethod.SNI,
        securityPolicy: SecurityPolicyProtocol.TLS_V1_2_2018,
      },
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket
          },
          behaviors: [{ isDefaultBehavior: true }],
        }
      ]
    });
  }

  deployContentToBucket(bucket: IBucket, distribution: CloudFrontWebDistribution) {
    new BucketDeployment(this, 'DeployContentWithInvalidation', {
      sources: [Source.asset('./assets')],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ['/*'],
    });
  }
}
