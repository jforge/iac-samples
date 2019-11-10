package main

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"log"
	"time"
)

func main() {
	// Initialize a session in eu-west-1 that the SDK will use to load
	// credentials from the shared credentials file ~/.aws/credentials.
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("eu-central-1")},
	)

	// Create S3 service client
	svc := s3.New(sess)

	req, _ := svc.PutObjectRequest(&s3.PutObjectInput{
		Bucket: aws.String("media-presign"),
		Key:    aws.String("being_developer.jpeg"),
		//Body:   strings.NewReader("EXPECTED CONTENTS"),
	})
	str, err := req.Presign(15 * time.Minute)

	log.Println("The URL is:", str, " err:", err)
}
