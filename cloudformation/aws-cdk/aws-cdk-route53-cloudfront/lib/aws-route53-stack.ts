import cdk = require('@aws-cdk/core');
//import route53 = require('@aws-cdk/aws-route53');
import  { PublicHostedZone, HostedZone } from '@aws-cdk/aws-route53';
import { OrganizationPrincipal } from '@aws-cdk/aws-iam';

export class Route53Stack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
   
    // create a new HostedZone for a subdomain (of a tld managed otherwise)
    new PublicHostedZone(this, 'HostedZone', {
      zoneName: 'cdktest.things.codes'
    });

    // add NS records from new hosted zone to existing hosted zone managing the tld
    let hostedZoneId ='Z1DRB2COKV1S59';

    const zone = HostedZone.fromHostedZoneId(this, 'MyZone', hostedZoneId);

    
  }
}