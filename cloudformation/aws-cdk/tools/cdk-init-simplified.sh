#!/usr/bin/env bash
#
# if in this project's folder /iac-samples/cloudformation/aws-cdk:
#
# creates:
# - a subfolder (from first argument) and
# - the content from directory ./simplified-init-template into this subfolder
#
# changes to the newly generated project folder

TEMPLATE_DIR=./simplified-init-template

CDK_PROJECT_DIR=$1

if [ -z $CDK_PROJECT_DIR ]; then
  echo "Missing Argument."
  echo "Usage: cdk-init-simplified.sh <cdk-project-dir-name>"
  echo
  exit 1
fi

function copyIgnoreFiles() {
  cp $TEMPLATE_DIR/.gitignore $1
}

function deleteBlueprintNodeModules() {
  rm -rf $TEMPLATE_DIR/node_modules
}

function copyBlueprintFiles() {
  deleteBlueprintNodeModules
  cp -r $TEMPLATE_DIR/* $1
  copyIgnoreFiles $1
}

echo "Creating CDK project from $TEMPLATE_DIR..."

mkdir $CDK_PROJECT_DIR

copyBlueprintFiles $CDK_PROJECT_DIR

echo "Created CDK project: $CDK_PROJECT_DIR"

cd $CDK_PROJECT_DIR
exec bash
