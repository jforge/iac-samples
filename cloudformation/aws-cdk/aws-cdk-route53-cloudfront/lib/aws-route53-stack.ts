import cdk = require('@aws-cdk/core');
import { AddressRecordTarget, ARecord, ARecordProps, HostedZone, IHostedZone, PublicHostedZone } from '@aws-cdk/aws-route53';
import { CloudFrontTarget } from '@aws-cdk/aws-route53-targets';
import { BucketProps } from '../lib/aws-s3-stack';
import { CloudFrontWebDistribution, SSLMethod, SecurityPolicyProtocol } from '@aws-cdk/aws-cloudfront';
import { DnsValidatedCertificate } from '@aws-cdk/aws-certificatemanager';
import { IBucket } from '@aws-cdk/aws-s3';
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment';

interface CombinedStackProps extends BucketProps {
  primaryHostedZoneName?: string
}

export class Route53StackNewHostedZone extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: CombinedStackProps) {
    super(scope, id, props);

    if (!props || !props.primaryHostedZoneName) {
      console.error('Given stack properties do not contain valid parameters.');
      return;
    }

    // create a new HostedZone for a subdomain (of a tld managed otherwise)
    const zone = new PublicHostedZone(this, 'HostedZone-test', {
      zoneName: `test-zone.${props.primaryHostedZoneName}`
    });

    // add NS records from new hosted zone to existing hosted zone managing the tld
    let hostedZoneId = zone.hostedZoneId;
  }
}

export class Route53StackPredefinedZone extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: CombinedStackProps) {
    super(scope, id, props);

    if (!props || !props.env || !props.primaryHostedZoneName || !props.userBucket) {
      console.error('Given stack properties do not contain valid parameters.');
      return;
    }

    // determine the existing hosted zone
    const zone = HostedZone.fromLookup(this, 'HostedZone-lab', {
      domainName: `${props.primaryHostedZoneName}.`
    });

    // derive the site domain name
    const siteDomain = this.buildSiteDomainName(props);
    new cdk.CfnOutput(this, 'Site', { value: 'https://' + siteDomain });

    // TLS certificate
    const certificateArn = this.buildCertificate(siteDomain, zone);
    new cdk.CfnOutput(this, 'Certificate', { value: certificateArn });

    // CloudFront distribution that provides HTTPS
    const distribution: CloudFrontWebDistribution = this.buildCloudfrontDistribution(
      siteDomain,
      certificateArn,
      props.userBucket);
    new cdk.CfnOutput(this, 'DistributionId', { value: distribution.distributionId });

    // Deploy bucket content in Cloudfront distribution context
    this.deployContentToBucket(props.userBucket, distribution);

    // Route53 alias record for the CloudFront distribution
    const aRecord: ARecord = this.buildAliasRecord(
      zone,
      `test-alias.${props.primaryHostedZoneName}.`,
      distribution);
    new cdk.CfnOutput(this, 'AliasRecord', { value: aRecord.domainName });

  }

  buildAliasRecord(zone: IHostedZone, recordName: string, distribution: CloudFrontWebDistribution): ARecord {
    const recordProps: ARecordProps = {
      zone: zone,
      recordName: recordName,
      target: AddressRecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      ttl: cdk.Duration.minutes(5)
    };
    return new ARecord(this, "SiteAliasRecord", recordProps);
  }

  buildSiteDomainName(props: CombinedStackProps): string {
    return `test-alias.${props.primaryHostedZoneName}`;
  }

  buildCertificate(siteDomain: string, zone: IHostedZone): string {
    return new DnsValidatedCertificate(this, 'SiteCertificate', {
      domainName: siteDomain,
      hostedZone: zone,
      region: 'us-east-1'
    }).certificateArn;
  }

  buildCloudfrontDistribution(siteDomain: string, certificateArn: string, bucket: IBucket): CloudFrontWebDistribution {
    return new CloudFrontWebDistribution(this, 'SiteDistribution', {
      aliasConfiguration: {
        acmCertRef: certificateArn,
        names: [siteDomain, `www.${siteDomain}`],
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
    new BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [Source.asset('./assets')],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ['/*'],
    });
  }
}
