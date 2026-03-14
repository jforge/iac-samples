terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 5.0" # Use the AWS provider version 5.x
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "eu-central-1" # Frankfurt region
  # OpenTofu will use your AWS credentials from ~/.aws/credentials or env vars
}

# 1. Create the S3 Bucket
resource "aws_s3_bucket" "my_bucket" {
  # Bucket names must be globally unique across all of AWS
  bucket = "pi-awesome-tofu-bucket-2026"

  tags = {
    Name = "My Tofu Bucket"
    Environment = "Development"
    ManagedBy = "OpenTofu"
  }
}

# 2. Enable Versioning (Best Practice)
resource "aws_s3_bucket_versioning" "bucket_versioning" {
  bucket = aws_s3_bucket.my_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

# 3. Block Public Access (Security Best Practice)
resource "aws_s3_bucket_public_access_block" "public_access" {
  bucket = aws_s3_bucket.my_bucket.id

  block_public_acls = true
  block_public_policy = true
  ignore_public_acls = true
  restrict_public_buckets = true
}
