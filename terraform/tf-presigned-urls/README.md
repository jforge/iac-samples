# Using AWS Pre-Signed Urls for S3 Bucket access

A pre-signed URL allows you to grant temporary access to users who don't have permission to directly run AWS operations 
in your account. A pre-signed URL is signed with your credentials and can be used by any user.

It's also useful to get rid of timeout issues:

- for downloads using Lambda functions in front of a [AWS S3 Bucket](https://aws.amazon.com/s3)
- for uploads using API Gateway in front of S3 .

## Avoid Limits by API Gateway

API Gateway has a hard limit for Integration Timeouts:
50ms up to 29s for all integration types, including Lambda, Lambda-Proxy, HTTP-, HTTP-Proxy and AWS integrations.

To eliminate issues concerning the maximum 29s a pre-signed url can help for bigger uploads.

## Avoid Limits by AWS Lambda

AWS Lambda defines a generous 15 minute timeout limits, but also limits payload size to 6 MB

To eliminate issues concerning the 6 mb size limit a pre-signed url can help for bigger downloads.

## [Requirements](#requirements)

- AWS account
- Terraform >= 0.11.10

## Creating a pre-signed Url for Upload

On access generate an url and provide a redirect for the caller to direct S3 Bucket download

Scenario: Upload through an API Gateway

## Creating a pre-signed Url for Download

On access generate an url and provide a redirect for the caller to direct S3 Bucket download

Scenario: Download through a Lambda

## Further resources

- [Generating pre-signed object urls with go](https://docs.aws.amazon.com/sdk-for-go/v1/developer-guide/s3-example-presigned-urls.html)
- [AWS API Gateway Limits](https://docs.aws.amazon.com/de_de/apigateway/latest/developerguide/limits.html)
- [AWS Lambda Limits](https://docs.aws.amazon.com/de_de/lambda/latest/dg/limits.html)

## FAQ

### Pre-signed Urls vs. Signed Urls

[AWS-Docs Pre-signed Urls](https://docs.aws.amazon.com/AmazonS3/latest/dev/PresignedUrlUploadObject.html)

A pre-signed URL gives you access to the object identified in the URL,
provided that the creator of the pre-signed URL has permissions to access that object.
That is, if you receive a pre-signed URL to upload an object, you can upload the object only
if the creator of the pre-signed URL has the necessary permissions to upload that object.

[AWS-Docs Signed Urls](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)

A signed URL includes additional information, for example, an expiration date and time,
that gives you more control over access to your content. This additional information appears
in a policy statement, which is based on either a canned policy or a custom policy.
The differences between canned and custom policies are explained in the next two sections.

### Setting up Golang testers

- Install Go or use Docker with Go image.
- Use [Go Modules](https://github.com/golang/go/wiki/Modules) as the dependency management (do not use deprecated Go Dep tool)

```bash
go mod init github.com/<your_account>/<your_project>
```

- Open go.mod and add dependencies

```hcl
require (
   github.com/aws/aws-sdk-go v1.17.7s
)
```

- Build and run

```bash
go run presignPutS3.go
```

- Find Updates

```bash
go get -u
```

#### Result of presignPutS3

The presignPutS3 routine produces a response with a permanent redirect

```xml
<Error>
<Code>PermanentRedirect</Code>
<Message>
The bucket you are attempting to access must be addressed using the specified endpoint. Please send all future requests to this endpoint.
</Message>
<Endpoint>media-presign.s3.eu-central-1.amazonaws.com</Endpoint>
<Bucket>media-presign</Bucket>
<RequestId>7693B525F4D0B058</RequestId>
<HostId>
FEcBFt2TB6Eac7aUHlhYDSgH8rZvrctH7z3XK4BnSXr7otHixd4/gE/QShlV1cWPih4Uw6YRW9w=
</HostId>
</Error>
```
