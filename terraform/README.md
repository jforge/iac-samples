# terraform-aws-samples

Samples for [Hashicorp Terraform](https://www.terraform.io/) plans to handle [AWS](https://aws.amazon.com) resources.

# [Requirements](#requirements)

* AWS account
* Terraform >= 0.11.10

# [Samples](#samples)

* Terraforming [AWS API Gateway](tf-aws-apigateway/README.md)

* Terraforming [AWS Route 53](tf-aws-route53/README.md)

* Terraforming [AWS S3](tf-aws-s3/README.md)

# Testing and Demos

* Create an AWS Account
* Download/Install/Upgrade AWS CLI
```
sudo pip install --upgrade awscli
```
* Create a profile, so that ```~/.aws/credentials``` contains your access information
```
aws configure
```

