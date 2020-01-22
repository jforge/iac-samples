#!/usr/bin/env bash
#
# Create a AWS Secrets Manager Secret containing a Github Access Token required for the AWS Amplify console app sample
#
# Requires AWS CLI and a proper configuration
#

# aws secretsmanager put-secret-value --secret-id production/GitHubAccessToken --secret-string '...'

aws secretsmanager create-secret --name production/GitHubAccessToken --secret-string '<your-github-personal-acccess-token-value>'

aws secretsmanager list-secrets

aws secretsmanager get-secret-value --secret-id production/GitHubAccessToken
