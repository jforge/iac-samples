#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CfnApp, CfnBranch } from '@aws-cdk/aws-amplify';
import { CfnOutput } from '@aws-cdk/core';

export class AmplifyConsoleAppCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // TODO: github PAT from secure parameter store (ssm)
    // TODO: create and connect route53 domain

    const amplifyApp = new CfnApp(this, 'test-app', {
      name: 'your-amplify-console-app-name',
      description: 'Amplify Console App from Test App Github Repository',
      repository: 'https://github.com/jforge/search-vue-parcel-typescript',
      oauthToken: ''
    });

    const amplifyBranch = new CfnBranch(this, 'MasterBranch', {
      appId: amplifyApp.attrAppId,
      enableAutoBuild: true,
      branchName: 'master' // you can put any branch here (careful, it will listen to changes on this branch)
    });

    new CfnOutput(this, "amplifyConsoleAppId", {
      value: amplifyApp.attrAppId
    });

    new CfnOutput(this, "amplifyConsoleAppUrl", {
      value: 'https://'.concat(amplifyBranch.branchName, '.<how-to-retrieve-the-amplify-subdomain>', '.amplifyapp.com')
    });

  }
}

const app = new cdk.App();
new AmplifyConsoleAppCdkStack(app, 'AmplifyConsoleApp');
app.synth();
