#!/usr/bin/env bash
# cdk-deploy-to-test.sh
bash cdk-deploy-to.sh 123457689 us-east-1 "$@" || exit $?
