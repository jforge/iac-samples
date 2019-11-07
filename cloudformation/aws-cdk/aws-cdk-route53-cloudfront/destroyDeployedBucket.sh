#!/usr/bin/env bash
#
# Removes a (non-empty)  bucket deployed with cdk and found in it's yaml'd cloudformation stack
# You new jq, aws-cli and a default configuration matching the CDK environment
#

CFN_TEMPLATE=BucketStack.template.json

set -x

BUCKET_NAME=`jq -j '..|objects|.BucketName//empty' cdk.out/$CFN_TEMPLATE`

echo $BUCKET_NAME

aws s3 rm s3://$BUCKET_NAME --recursive

aws s3 rb s3://$BUCKET_NAME --force


