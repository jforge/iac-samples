provider "aws" {
  profile = var.aws_profile
  region  = var.region
}

terraform {
  backend "s3" {
    bucket  = "my-team-dev-tfstate"
    key     = "team-test/dev/application/tfstate"
    region  = "eu-central-1"
    profile = "my-team-dev"
  }
}
