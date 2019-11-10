variable "profile" {
  description = "AWS profile"
  type        = "string"
}

variable "aws_region" {
  description = "AWS region"
  type        = "string"
}

variable "aws_r53_primary_domain" {
  description = "Primary domain"
  type        = "string"
}

variable "test_subdomain_prefix" {
  description = "Prefix for the test subdomain name"
  type        = "string"
  default     = "test"
}

variable "aws_r53_default_a_ttl" {
  type        = "string"
  description = "Default TTL for A records"
}

variable "aws_r53_default_cname_ttl" {
  type        = "string"
  description = "Default TTL for CNAME records"
}

variable "aws_r53_default_mx_ttl" {
  type        = "string"
  description = "Default TTL for MX records"
}

variable "aws_r53_default_txt_ttl" {
  type        = "string"
  description = "Default TTL for TXT records"
}

variable "aws_r53_primary_domain_a_records" {
  type        = "map"
  description = "Map of A records separate by comma and space (, )"
}

variable "aws_r53_primary_domain_cname_records" {
  type        = "map"
  description = "Map of CNAME records separate by comma and space (, )"
}

variable "aws_r53_primary_domain_mx_records" {
  type        = "map"
  description = "Map of MX records separate by comma and space (, )"
}

variable "aws_r53_primary_domain_txt_records" {
  type        = "map"
  description = "Map of TXT records separate by comma and space (, )"
}
