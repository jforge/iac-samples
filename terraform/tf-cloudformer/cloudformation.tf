variable "aws_profile" {
  description = "Enter the aws profile to deploy."
  default     = "iwhh-tarvos-dev"
}

variable "region" {
  default = "eu-central-1"
}

data "aws_vpc" "my_team_vpc" {
  filter {
    name   = "tag:Name"
    values = [var.aws_profile]
  }
}

resource "aws_cloudformation_stack" "network" {
  name = "signinui-team-dev-stack"

  parameters = {
    VPCSelection = "Default",
    Password = "PASSWORD",
    Username = "team-dev"
  }

  capabilities = ["CAPABILITY_IAM"]

  template_url = "https://s3.eu-central-1.amazonaws.com/cloudformation-templates-eu-central-1/CloudFormer.template"
}
