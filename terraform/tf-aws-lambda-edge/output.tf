output "aws_iam_role_lambda_edge_name" {
  value = "${aws_iam_role.lambda_edge.arn}"
}

output "aws_lambda_function_edge_viewer_request" {
  value = "${aws_lambda_function.edge_lambda_viewer_request.arn}"
}

output "aws_lambda_function_edge_viewer_response" {
  value = "${aws_lambda_function.edge_lambda_viewer_response.arn}"
}

output "aws_lambda_function_edge_origin_request" {
  value = "${aws_lambda_function.edge_lambda_origin_request.arn}"
}

output "aws_lambda_function_edge_origin_response" {
  value = "${aws_lambda_function.edge_lambda_origin_response.arn}"
}

