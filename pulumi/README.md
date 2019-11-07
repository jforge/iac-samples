# Pulumi playground

## Setup

```bash
brew install pulumi
```

Install Node.js and AWS CLI.

Get an AWS account.

```bash
àws configure
```

Configure Pulumi for different AWS profiles:

```bash
pulumi config set aws:profile <profilename>
```

## Create project

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

### Destroy resources

```bash
pulumi destroy
```

The AWS resource now should be deleted.

