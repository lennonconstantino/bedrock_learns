#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TsStack } from '../lib/ts-stack';

const app = new cdk.App();
new TsStack(app, 'TsImageStack', {
});
