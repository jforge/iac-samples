#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CfnApp, CfnBranch } from '@aws-cdk/aws-amplify';
import { CfnOutput, SecretValue } from '@aws-cdk/core';

export class AmplifyConsoleAppCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Handle Github Access Token for the Amplify Console App:
    // - It's not acceptable to use a clear text oAuthToken in source code
    // - It's not acceptable to use a clear text oAuthToken in AWS Systems Manager Parameter store
    // - It's not possible to get a AWS Systems Manager Parameter Store SecureString (seems to be limited to certain services)
    // - It's therefore necessary to use the AWS Secrets Manager to securely store a github (personal) access token
    //   Use the SecretValue class to load the secret by friendly name

    // TODO: clarify pre-authorization of AWS Amplify Console for a Github Account (auth is required before deploying an app)
    // TODO: clarify initial amplify console app build
    // TODO: create and connect Route53 domain
    // TODO: provide ACM cert and set (strict) security headers using buildspec.yml
    // TODO: enable password-protected automatic pull request previews and feature branch versions

    const githubRepositoryUrl: string = 'https://github.com/jforge/search-vue-parcel-typescript';
    const githubAccesTokenSecret: SecretValue = SecretValue.secretsManager('production/GitHubAccessToken');

    const amplifyApp = new CfnApp(this, 'amplify-console-app', {
      name: 'your-amplify-console-app-name',
      description: 'Amplify Console App from Test App Github Repository',
      repository: githubRepositoryUrl,
      oauthToken: githubAccesTokenSecret.toString()
    });

    const amplifyBranch = new CfnBranch(this, 'MasterBranch', {
      appId: amplifyApp.attrAppId,
      enableAutoBuild: true,
      branchName: 'master'
    });

    const appUrl: string = 'https://'.concat([amplifyBranch.branchName, amplifyApp.attrAppId, 'amplifyapp.com'].join('.'));

    new CfnOutput(this, "amplifyConsoleAppUrl", {
      value: appUrl
    });

  }
}

const app = new cdk.App();
new AmplifyConsoleAppCdkStack(app, 'AmplifyConsoleApp');
app.synth();
