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

    new SPADeploy(this, 'spaDeployZoned').createSiteFromHostedZone({
      zoneName: 'lab.00x.de',
      indexDoc: indexDocument,
      websiteFolder: siteContentPath
    });

  }
}

const app = new App();
new SpaDeployStack(app, 'SpaDeployStack');

