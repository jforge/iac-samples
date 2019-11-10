package main

import (
	"fmt"
	"context"
	"github.com/aws/aws-lambda-go/lambda"
	"time"
)

type MyEvent struct {
	Name string `json:"name"`
}

func HandleRequest(ctx context.Context, name MyEvent) (string, error) {
	// let the request time out in lambda for api-gateway
	time.Sleep(40 * time.Second)
	return fmt.Sprintf("Hello %s!", name.Name ), nil
}

func main() {
	lambda.Start(HandleRequest)
}
