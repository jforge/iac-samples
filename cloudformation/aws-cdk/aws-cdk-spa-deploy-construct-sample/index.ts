#!/usr/bin/env node
import 'source-map-support/register';
import { App, Construct, Stack, StackProps } from '@aws-cdk/core';
import { SPADeploy, SPADeployConfig } from 'cdk-spa-deploy';

export class SpaDeployStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const siteContentPath: string = './assets/site-content';
    const indexDocument: string = 'index.html';

    const spaDeployConfig: SPADeployConfig = {
      indexDoc: indexDocument,
      websiteFolder: siteContentPath
    };

    new SPADeploy(this, 'spaDeploy').createBasicSite(spaDeployConfig);

    new SPADeploy(this, 'cfDeploy').createSiteWithCloudfront(spaDeployConfig);

    /*
    HostedZone SPA Deploy throws this:
     Cannot retrieve value from context provider hosted-zone since account/region
     are not specified at the stack level. Either configure "env" with explicit
     account and region when you define your stack, or use the environment variables
     "CDK_DEFAULT_ACCOUNT" and "CDK_DEFAULT_REGION" to inherit environment information
     from the CLI (not recommended for production stacks)

    new SPADeploy(this, 'spaDeployZoned').createSiteFromHostedZone({
      zoneName: 'lab.00x.de',
      indexDoc: indexDocument,
      websiteFolder: siteContentPath
    });
    */

  }
}

const app = new App();
new SpaDeployStack(app, 'SpaDeployStack');

