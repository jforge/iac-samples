#!/usr/bin/env bash

PROFILES=$(awk -F"\\\]|\\\[" '/^\[/{print $2}' ~/.aws/credentials)

select PROFILE in $PROFILES; do
  export AWS_ACCESS_KEY_ID="$(aws configure get aws_access_key_id --profile $PROFILE)"
  export AWS_SECRET_ACCESS_KEY="$(aws configure get aws_secret_access_key --profile $PROFILE)"
  export AWS_DEFAULT_REGION="$(aws configure get region --profile $PROFILE)"
  export AWS_PROFILE=$PROFILE
  break
done

echo AWS_PROFILE=$AWS_PROFILE
echo AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
echo AWS_SECRET_ACCESS_KEY=$(echo $AWS_SECRET_ACCESS_KEY|tr '[:print:]' '*')
echo AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION
