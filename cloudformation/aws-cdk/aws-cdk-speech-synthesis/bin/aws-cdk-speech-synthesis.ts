#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsCdkSpeechSynthesisStack } from '../lib/aws-cdk-speech-synthesis-stack';

const app = new cdk.App();
new AwsCdkSpeechSynthesisStack(app, 'AwsCdkSpeechSynthesisStack');
