provider "aws" {
  profile = "${var.aws_profile}"
  region  = "${var.aws_region}"
  version = "~> 2.31.0"
}

terraform {
  required_version = ">= 0.12.10"
}

data "aws_iam_policy_document" "lambda-edge-assume-role-policy" {
  statement {
    actions = [
      "sts:AssumeRole"
    ]
    principals {
      type        = "Service"
      identifiers = [
        "lambda.amazonaws.com",
        "edgelambda.amazonaws.com"
      ]
    }
  }
}

resource "aws_iam_role" "lambda_edge" {
  name = "lambda_edge_role"
  path = "/"
  assume_role_policy = "${data.aws_iam_policy_document.lambda-edge-assume-role-policy.json}"
}

data "archive_file" "lambda_edge_viewer_request_zip" {
  type        = "zip"
  source_file  = "assets/edge_viewer_request_handler/index.js"
  output_path = "lambda-edge-viewer-request.zip"
}

resource "aws_lambda_function" "edge_lambda_viewer_request" {
  function_name = "lambda-edge-viewer-request"
  
  filename = "lambda-edge-viewer-request.zip"
  handler  = "index.handler"
  runtime  = "nodejs8.10"
  publish  = "true"
  
  role = "${aws_iam_role.lambda_edge.arn}"
}


data "archive_file" "lambda_edge_origin_request_zip" {
  type        = "zip"
  source_file  = "assets/edge_origin_request_handler/index.js"
  output_path = "lambda-edge-origin-request.zip"
}
resource "aws_lambda_function" "edge_lambda_origin_request" {
  function_name = "lambda-edge-origin-request"

  filename = "lambda-edge-origin-request.zip"
  handler  = "index.handler"
  runtime  = "nodejs8.10"
  publish  = "true"
  
  role = "${aws_iam_role.lambda_edge.arn}"
}

data "archive_file" "lambda_edge_origin_response_zip" {
  type        = "zip"
  source_file  = "assets/edge_origin_response_handler/set_security_headers/index.js"
  output_path = "lambda-edge-origin-response.zip"
}
resource "aws_lambda_function" "edge_lambda_origin_response" {
  function_name = "lambda-edge-origin-response"

  filename = "lambda-edge-origin-response.zip"
  handler  = "index.handler"
  runtime  = "nodejs8.10"
  publish  = "true"
  
  role = "${aws_iam_role.lambda_edge.arn}"
}
data "archive_file" "lambda_edge_viewer_response_zip" {
  type        = "zip"
  source_file  = "assets/edge_viewer_response_handler/index.js"
  output_path = "lambda-edge-viewer-response.zip"
}
resource "aws_lambda_function" "edge_lambda_viewer_response" {
  function_name = "lambda-edge-viewer-response"

  filename = "lambda-edge-viewer-response.zip"
  handler  = "index.handler"
  runtime  = "nodejs8.10"
  publish  = "true"
  
  role = "${aws_iam_role.lambda_edge.arn}"
}

