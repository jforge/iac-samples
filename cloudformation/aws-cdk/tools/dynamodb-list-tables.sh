#!/usr/bin/env bash

PROFILES=$(awk -F"\\\]|\\\[" '/^\[/{print $2}' ~/.aws/credentials)
REGIONS=$(aws ec2 describe-regions --query "Regions[].{Name:RegionName}" --output text --no-all-regions | sort)

echo "Select a profile to list DynamoDB Tables for:"
select PROFILE in $PROFILES; do
    echo "Select a region:"
    select REGION in $REGIONS; do
        export AWS_DEFAULT_REGION=$REGION
        aws dynamodb list-tables --profile $PROFILE
        break;
    done
    break
done
