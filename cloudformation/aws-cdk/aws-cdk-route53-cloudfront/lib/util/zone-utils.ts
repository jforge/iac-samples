import cdk = require('@aws-cdk/core');
import {HostedZone, IHostedZone} from "@aws-cdk/aws-route53";

export default class ZoneUtils {

  static determineHostedZone(stack: cdk.Stack, primaryHostedZoneName: string): IHostedZone {
    // determine the existing hosted zone
    return HostedZone.fromLookup(stack, 'HostedZone-lab', {
      domainName: `${primaryHostedZoneName}.`
    });
  }
}
