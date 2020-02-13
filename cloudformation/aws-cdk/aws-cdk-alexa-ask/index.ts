#!/usr/bin/env node
import 'source-map-support/register';
import { App, Construct, Stack, StackProps } from '@aws-cdk/core';
import { CfnSkill, CfnSkillProps } from '@aws-cdk/alexa-ask';


export class AlexasAskStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const skillProps: CfnSkillProps = {
      authenticationConfiguration: {
        clientId: '',
        clientSecret: '',
        refreshToken: ''
      },
      skillPackage: {
        s3Bucket: '',
        s3Key: ''
      },
      vendorId: ''
    }

    new CfnSkill(this, "AlexaSkill", skillProps);

  }
}

const app = new App();
new AlexasAskStack(app, 'AlexasAskStack');

