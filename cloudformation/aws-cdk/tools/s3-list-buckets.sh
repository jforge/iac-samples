#!/usr/bin/env bash

PROFILES=$(awk -F"\\\]|\\\[" '/^\[/{print $2}' ~/.aws/credentials)

echo "Select a profile to list S3 Buckets for:"
select PROFILE in $PROFILES; do
    aws s3api list-buckets --query "Buckets[].Name" --profile $PROFILE
    break
done
