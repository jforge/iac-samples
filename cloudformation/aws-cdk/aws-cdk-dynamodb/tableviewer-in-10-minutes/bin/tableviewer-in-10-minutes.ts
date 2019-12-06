#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { TableviewerIn10MinutesStack } from '../lib/tableviewer-in-10-minutes-stack';

const app = new cdk.App();

new TableviewerIn10MinutesStack(app, 'TableviewerIn10MinutesStack');
