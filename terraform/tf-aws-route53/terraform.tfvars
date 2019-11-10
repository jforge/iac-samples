aws_region      = "eu-central-1"

aws_r53_primary_domain = "example.com"

aws_r53_default_a_ttl     = "900"
aws_r53_default_cname_ttl = "900"
aws_r53_default_mx_ttl    = "86400"
aws_r53_default_txt_ttl   = "900"

aws_r53_primary_domain_a_records = {
  "example.com"                              = "200.100.1.1"
  "ping.example.com"                         = "200.100.1.2"
}

aws_r53_primary_domain_cname_records = {
  "mail.example.com"                         = "ghs.google.com"
  "www.example.com"                          = "example.com"
}

aws_r53_primary_domain_mx_records = {
  "example.com"                              = "5 aspmx.l.google.com, 10 alt1.aspmx.l.google.com, 15 alt2.aspmx.l.google.com"
}

aws_r53_primary_domain_txt_records = {
  "_domainkey.example.com"                   = "t=y\\; o=~\\;"
  "46576765765735.pm._domainkey.example.com" = "k=rsa\\; p=N0W10KKS2PAZUS08CV2RC9YA113DQBGBW4R8RI0L4SN9SRCMVW7QT9HH9YNCqHtYvED2wi4uc+WLPEGdYX6icFDJlUvZWEBAjCqQxw3dCSWiz4K+IB6E9tnxtDjbttVXKi/wVRDyC4V0U8m01icVRqxN0W10KKS2PAZUS08CV2RC9YA113DQBGBW4R8RI0L4SN9SRCMVW7QT9HH9YNCAQAB"
  "google._domainkey.example.com"            = "v=DKIM1\\; k=rsa\\; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCOZRGdN4jeQkfLBNVC6N2suEBqZ4fjfe0YpWN1gV98JiVRMk9F2vN0W10KKS2PAZUS08CV2RC9YA113DQBGBW4R8RI0L4SN9SRCMVW7QT9HH9YNCN0W10KKS2PAZUS08CV2RC9YA113DQBGBW4R8RI0L4SN9SRCMVW7QT9HH9YNCB"
}
