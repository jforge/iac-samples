import cdk = require('@aws-cdk/core');
import {
  PublicHostedZone,
  HostedZone,
  ARecord,
  ARecordProps,
  AddressRecordTarget
} from '@aws-cdk/aws-route53';
import { BucketProps } from '../lib/aws-s3-stack';
import { BucketWebsiteTarget } from '@aws-cdk/aws-route53-targets';

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

    // create an additional A record pointing to a bucket
    const recordProps: ARecordProps = {
      zone: zone,
      recordName: `test-alias.${props.primaryHostedZoneName}.`,
      target: AddressRecordTarget.fromAlias(new BucketWebsiteTarget(props.userBucket)),
      ttl: cdk.Duration.minutes(5)
    }

    new ARecord(this, "AliasRecord-lab", recordProps);

  }
}
