#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { 01ScheduledNotificationsStack } from '../lib/01_scheduled_notifications-stack';

const app = new cdk.App();
new 01ScheduledNotificationsStack(app, '01ScheduledNotificationsStack');
