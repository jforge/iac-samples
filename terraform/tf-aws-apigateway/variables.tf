variable "profile" {
  // default = "default"
  default = "tarvos-dev"
}

variable "aws_region" {
  description = "AWS region"
  type        = "string"
  default     = "eu-central-1"
}

// Getting Id for an existing subdomain resource
data "aws_route53_zone" "media_subdomain_00x_de" {
  name         = "${var.subdomain_name}."
  private_zone = false
}

variable "subdomain_name" {
  default = "media.00x.de"
}

variable "test_subdomain_prefix" {
  description = "Prefix for the test subdomain name"
  default     = "test"
}

variable "apigateway-endpoint" {
  default = "00x.de"
}

// Getting Id for an existing API gateway resource
data "aws_api_gateway_rest_api" "api" {
  name = "mymedia-api-gateway"
}
//
//data "aws_api_gateway_resource" "proxy-resource" {
//  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
//  path        = "/mytestresource"
//}
