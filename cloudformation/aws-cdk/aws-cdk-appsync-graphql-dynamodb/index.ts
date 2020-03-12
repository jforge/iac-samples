#!/usr/bin/env node
import 'source-map-support/register';
import { App, Construct, Stack, StackProps } from '@aws-cdk/core';

export class AppSyncGraphQlStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
  }
}

const app = new App();
new AppSyncGraphQlStack(app, 'AppSyncGraphQlStack');

