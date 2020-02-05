# Pulumi playground

Samples for using Pulumi with different cloud providers.

## Setup

```bash
brew install pulumi
```

### Setup a cloud provider SDK and CLI

Install Node.js and AWS CLI.

Get an AWS account.

```bash
àws configure
```

### Configure Pulumi for different AWS profiles

```bash
pulumi config set aws:profile <profilename>
```

## Create a project

```bash
mkdir quickstart && cd quickstart
pulumi new aws-typescript
```

## Deploy resources

```bash
pulumi up
```

Review resources in AWS and on the Pulumi app page:

```bash
https://app.pulumi.com/<your_account_name>/quickstart/<stackname|dev>/updates/1
```

## Destroy resources

```bash
pulumi destroy
```

The AWS resource now should be deleted.

## Pulumi documentation

- [Install Pulumis](https://www.pulumi.com/docs/get-started/install/)
