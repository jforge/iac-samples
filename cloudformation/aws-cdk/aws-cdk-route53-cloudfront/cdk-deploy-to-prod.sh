#!/usr/bin/env bash
# cdk-deploy-to-prod.sh
bash cdk-deploy-to.sh 135792468 us-west-1 "$@" || exit $?
bash cdk-deploy-to.sh 246813579 eu-west-1 "$@" || exit $?
