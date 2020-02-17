#!/usr/bin/env node
import 'source-map-support/register';
import { App, Construct, Stack, StackProps } from '@aws-cdk/core';
import { SPADeploy } from 'cdk-spa-deploy';

export class SpaDeployStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new SPADeploy(this, 'spaDeploy').createBasicSite({
      indexDoc: 'index.html',
      websiteFolder: '../blog/dist/blog'
    });

    new SPADeploy(this, 'cfDeploy').createSiteWithCloudfront({
      indexDoc: 'index.html',
      websiteFolder: '../blog/dist/blog'
    });

    new SPADeploy(this, 'spaDeployZoned').createSiteFromHostedZone({
      zoneName: 'lab.00x.de',
      indexDoc: 'index.html',
      websiteFolder: '../blog/dist/blog'
    });

  }
}

const app = new App();
new SpaDeployStack(app, 'SpaDeployStack');

