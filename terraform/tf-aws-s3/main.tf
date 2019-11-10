# Configure the AWS Provider
provider "aws" {
  #  access_key = "${var.aws_access_key}"
  #  secret_key = "${var.aws_secret_key}"
  profile = "${var.profile}"
  region  = "${var.aws_region}"
  version = "~> 2.7"
}

terraform {
  required_version = ">= 0.12.10"
}
