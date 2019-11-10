package main

import (
	"bytes"
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"io"
	"log"
	"net/http"
	"os"
	"time"
)

// Downloads an item from an S3 Bucket in the region configured in the shared config
// or AWS_REGION environment variable.
//
// Usage:
//    go run s3_download.go
func main() {

	file, err := os.Open("being_developer.jpeg")
	if err != nil {
		fmt.Println(err)
		os.Exit(1)

	}
	defer file.Close()

	fileInfo, _ := file.Stat()
	var size int64 = fileInfo.Size()

	buffer := make([]byte, size)
	file.Read(buffer)
	fileBytes := bytes.NewReader(buffer)
	//fileType := http.DetectContentType(buffer)


	md5s, err := hashFileMd5(os.Args[0])
	if err == nil {
		fmt.Println(md5s)
	}

	//h := md5.New()
	//content := strings.NewReader(&dat)
	//content.WriteTo(h)

	// Initialize a session in eu-west-1 that the SDK will use to load
	// credentials from the shared credentials file ~/.aws/credentials.
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("eu-central-1")},
	)

	// Create S3 service client
	svc := s3.New(sess)

	resp, _ := svc.PutObjectRequest(&s3.PutObjectInput{
		Bucket: aws.String("media-presign"),
		Key:    aws.String("being_developer.jpeg"),
	})

	//md5s := base64.StdEncoding.EncodeToString(h.Sum(nil))
	resp.HTTPRequest.Header.Set("Content-MD5", md5s)

	url, err := resp.Presign(15 * time.Minute)
	if err != nil {
		fmt.Println("error presigning request", err)
		return
	}

	log.Println("The URL is:", url, " err:", err)

	req, err := http.NewRequest("PUT", url, fileBytes)
	req.Header.Set("Content-MD5", md5s)
	//req.Header.Set("Content-Type", fileType)
	if err != nil {
		fmt.Println("error creating request", url)
		return
	}

	defClient, err := http.DefaultClient.Do(req)
	fmt.Println(defClient, err)


}

func hashFileMd5(filePath string) (string, error) {
	var returnMD5String string
	file, err := os.Open(filePath)
	if err != nil {
		return returnMD5String, err
	}
	defer file.Close()
	hash := md5.New()
	if _, err := io.Copy(hash, file); err != nil {
		return returnMD5String, err
	}
	hashInBytes := hash.Sum(nil)[:16]
	returnMD5String = hex.EncodeToString(hashInBytes)
	return returnMD5String, nil
}
