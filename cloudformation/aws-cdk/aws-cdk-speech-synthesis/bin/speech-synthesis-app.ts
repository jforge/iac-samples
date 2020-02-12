#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SpeechSynthesisStack } from '../lib/speech-synthesis-stack';

const app = new cdk.App();
new SpeechSynthesisStack(app, 'SpeechSynthesisStack');
