# Configure the AWS Provider
provider "aws" {
  #  access_key = "${var.aws_access_key}"
  #  secret_key = "${var.aws_secret_key}"
  profile = "${var.profile}"
  region  = "${var.aws_region}"
  version = "~> 1.39"
}

provider "aws" {
  #  access_key = "${var.aws_access_key}"
  #  secret_key = "${var.aws_secret_key}"
  profile = "${var.profile}"
  alias = "us-east-1"
  region  = "us-east-1"
  version = "~> 1.39"
}

terraform {
  required_version = ">= 0.11.10"
}

# create an api gateway

resource "aws_api_gateway_rest_api" "TestAPI" {
  name        = "TestAPI"
  description = "This is a Test API for demonstration purposes"
}

resource "aws_api_gateway_resource" "MyTestResource" {
  rest_api_id = "${aws_api_gateway_rest_api.TestAPI.id}"
  parent_id   = "${aws_api_gateway_rest_api.TestAPI.root_resource_id}"
  path_part   = "mytestresource"
}

# create a tls certificate

resource "aws_acm_certificate" "mymedia" {
//  domain_name = "${var.test_subdomain_prefix}.${var.subdomain_name}"
  domain_name = "${var.test_subdomain_prefix}.${substr(data.aws_route53_zone.media_subdomain_00x_de.name,0,length(data.aws_route53_zone.media_subdomain_00x_de.name)-1)}"
  validation_method = "DNS"
  provider = "aws.us-east-1"
}


resource "aws_route53_record" "cert_validation" {
  name    = "${aws_acm_certificate.mymedia.domain_validation_options.0.resource_record_name}"
  type    = "${aws_acm_certificate.mymedia.domain_validation_options.0.resource_record_type}"
  zone_id = "${data.aws_route53_zone.media_subdomain_00x_de.zone_id}"
  records = ["${aws_acm_certificate.mymedia.domain_validation_options.0.resource_record_value}"]
  ttl     = "60"
  provider = "aws.us-east-1"
}

resource "aws_acm_certificate_validation" "default" {
  certificate_arn = "${aws_acm_certificate.mymedia.arn}"
  validation_record_fqdns = [
    "${aws_route53_record.cert_validation.fqdn}",
  ]
  provider = "aws.us-east-1"
}

# create a api gateway custom domain name

resource "aws_api_gateway_domain_name" "mymedia" {
  domain_name = "${var.test_subdomain_prefix}.${var.subdomain_name}"
  certificate_arn = "${aws_acm_certificate.mymedia.arn}"

}

# get target domain name from custom domain name and set a CNAME value into host zone for subdomain

resource "aws_route53_record" "mymedia-api-gateway-cname" {
  zone_id = "${data.aws_route53_zone.media_subdomain_00x_de.zone_id}"
  name    = "${var.test_subdomain_prefix}.${var.subdomain_name}"
  type    = "A"

  alias {
    name                   = "${aws_api_gateway_domain_name.mymedia.cloudfront_domain_name}"
    zone_id                = "${aws_api_gateway_domain_name.mymedia.cloudfront_zone_id}"
    evaluate_target_health = false
  }

//  records = [
//    "${aws_api_gateway_domain_name.mymedia.domain_name}",
//  ]

}
resource "aws_api_gateway_deployment" "example" {
  # See aws_api_gateway_rest_api_docs for how to create this
  rest_api_id = "${data.aws_api_gateway_rest_api.api.id}"
  stage_name  = "dev"
}

resource "aws_api_gateway_base_path_mapping" "test" {
  api_id      = "${data.aws_api_gateway_rest_api.api.id}"
  stage_name  = "${aws_api_gateway_deployment.example.stage_name}"
  domain_name = "${aws_api_gateway_domain_name.mymedia.domain_name}"
}
