#!/usr/bin/env bash

DYNAMODB_TABLE_NAME="Routing-Rules"

aws dynamodb delete-table --table-name $DYNAMODB_TABLE_NAME
