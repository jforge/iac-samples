# primary domain - outputs
output "AWS primary domain ID" {
  depends_on = ["aws_route53_zone.main"]
  value = "${aws_route53_zone.main.id}"
}

output "AWS primary domain NS servers list" {
  depends_on = ["aws_route53_zone.main"]
  value = "${join(", ", aws_route53_zone.main.name_servers)}"
}

output "aws_acm_certificate_arn" {
  value = "${aws_acm_certificate.default.arn}"
}

