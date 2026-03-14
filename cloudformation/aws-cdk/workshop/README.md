# Yet another CDK workshop

This is a collection of CDK stacks for a CDK workshop for Node.js
developers without much cloudformation, IaC or AWS console/cli knowledge.

Focus is on getting in touch with CDK for some straightforward use cases,
less theory, no construct library discussion, just a fast MVP approach.

## Prerequisites

- AWS Account, IAM Role, S3 bucket

## Use case 1: Send SMS using an AWS SNS Topic

Use case: Get in touch with serverless messaging on AWS
to understand the technology and possible solutions.


## Use case 2: Get and notify S3 bucket events

Use case: In a release process one final task is to verify the
correct upload of artifacts to an S3 bucket. 

This should be automated by collecting the S3 events, notify 
an SNS topic and let consumers optionally subscribe (e.g. slack, email)

- Consume by eMail, send SMS
- Create a Node-RED flow to consume the message.
- Optional: Create a Connectware Service for consuming


## Use case 3: Get the S3 bucket event notification via MQTT

Use case: Consume AWS SNS notification with MQTT in order to
use a common protocol without the need of AWS specific implementations
on the client side

This requires interaction between SNS and AWS IoT Core

## Use case 4: Store the S3 bucket events in a database

Use case: the release process notifies any subscribers and
the result should be collected in a database for later auditss.

This requires a database like DynamoDB which is preferred
as a simple solution in CDK.
