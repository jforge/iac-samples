# DNS specific configuration
resource "aws_route53_zone" "main" {
  name = "${var.aws_r53_primary_domain}"
  private_zone = false
}

#Creating the Subdomain on the Team-Account
resource "aws_route53_zone" "subdomain_00x_de" {
  name = "${var.test_subdomain_prefix}.00x.de."
}

#Creating the Route53 Zone for the sub account on the aws master account
resource "aws_route53_record" "subdomain_NS" {
  provider = "aws.00x-default"
  zone_id  = "${data.aws_route53_zone.00x_de.zone_id}"
  name     = "${var.test_subdomain_prefix}.00x.de"
  type     = "NS"
  ttl      = "30"

  records = [
    "${aws_route53_zone.subdomain_00x_de.name_servers.0}",
    "${aws_route53_zone.subdomain_00x_de.name_servers.1}",
    "${aws_route53_zone.subdomain_00x_de.name_servers.2}",
    "${aws_route53_zone.subdomain_00x_de.name_servers.3}",
  ]
}

