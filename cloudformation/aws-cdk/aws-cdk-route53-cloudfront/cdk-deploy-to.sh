#!/usr/bin/env bash
# cdk-deploy-to.sh
CDK_DEPLOY_ACCOUNT=$1
CDK_DEPLOY_REGION=$2
shift 2
cdk deploy "$@"
