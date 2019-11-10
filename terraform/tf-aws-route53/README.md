# Terraform AWS Route 53

Example [Hashicorp Terraform](https://www.terraform.io/) plan to create a primary DNS zone and its records in [AWS Route 53](https://aws.amazon.com/route53‎).

## [Requirements](#requirements)

* AWS account
* Terraform >= 0.11.10

## [DNS record types](#dns-record-types)

Supported record types as follows:

| Record type   | Supported |
| ------------- | ---------- |
| A             | YES        |
| AAAA          | NO         |
| CAA           | NO         |
| CNAME         | YES        |
| LOC           | NO         |
| MX            | YES        |
| NS            | NO         |
| PTR           | NO         |
| SOA           | NO         |
| SRV           | NO         |
| SPF           | NO         |
| TXT           | YES        |

## [Quick Start](#quickstart)

Clone the repository

```bash
git clone https://github.com/jforge/terraform-aws-samples.git
```

Change folder

```bash
cd terraform-aws-samples/tf-aws-route53
```

Initialize Terraform

```bash
terraform init
```

Edit *terraform.tfvars* file

```bash
vim terraform.tfvars
```

Check the plan

```bash
terraform plan
```

Create resources

```bash
terraform apply
```

## [How-to](#how-to)

It is possible to perform any of the actions described below:

### [Plan](#how-to-plan)

Plan the creation of resources

```bash
terraform plan
```

### [Create](#how-to-create)

Create the resources

```bash
terraform apply
```

### [*Destroy*](#how-to-destroy)

Destroy the resources

```bash
terraform destroy
```

## [Feedback](#feedback)

### [Issues](#issues)

If you have problems, bugs, issues with or questions about this, please open it in [Github issues page](https://github.com/jforge/terraform-aws-samples/issues). Please do a little research before posting.
