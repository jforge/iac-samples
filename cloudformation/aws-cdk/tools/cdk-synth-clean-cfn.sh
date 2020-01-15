#!/usr/bin/env bash
#
# Synthesizes a cloudformation yaml template without any cdk metadata
#
cdk synth \
  --version-reporting false \
  --asset-metadata false \
  --path-metadata false
