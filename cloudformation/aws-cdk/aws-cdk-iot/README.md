# AWS CDK IoT example

## Datasource

The datasource is a Tinkerforge Weather station connected via brick daemon and brick-mqtt-proxy to a local network mosquitto broker that is bridged to AWS IoT.

## Local Broker

A common use case is a smart home with a dedicated local mosquitto broker on a small device (like RaspberryPi), because it is very easy to install, configure and run.

If you are used to use docker try the offical image: https://hub.docker.com/_/eclipse-mosquitto

```bash
docker run -it -p 1883:1883 -p 9001:9001 \
  -v $(pwd)/mosquitto/config:/mosquitto/config \
  -v $(pwd)/mosquitto/data:/mosquitto/data \
  -v $(pwd)osquitto/log:/mosquitto/log \
  eclipse-mosquitto
```

Rename the `mosquitto-prepared*` file to mosquitto.conf and replace the aws-iot endpoint address
given by the result of `aws iot describe-endpoint`.

## Bridge

* Reference: [How to bridge Mosquitto MQTT broker to AWS IoT](https://aws.amazon.com/de/blogs/iot/how-to-bridge-mosquitto-mqtt-broker-to-aws-iot/)

Have an AWS account, install the AWS CLI and configure it with `aws configure`.

Create Policy:

```bash
aws iot create-policy --policy-name bridge --policy-document '{"Version": "2012-10-17","Statement": [{"Effect": "Allow","Action": "iot:*","Resource": "*"}]}'
```

Create certificate and keys, and place them in the local mosquitto folder `/etc/mosquitto/certs`

```bash
sudo aws iot create-keys-and-certificate --set-as-active --certificate-pem-outfile cert.crt --private-key-outfile private.key --public-key-outfile public.key --region eu-central-1
```

List certificates

```bash
aws iot list-certificates
```

Attach policy to certificate

```bash
aws iot attach-principal-policy --policy-name bridge --principal <ARN_OF_CERTIFICATE>
```

Set read permissions to private key and client cert

```bash
sudo chmod 644 private.key
sudo chmod 644 cert.crt
```

Download root certificate

```bash
sudo wget https://www.symantec.com/content/en/us/enterprise/verisign/roots/VeriSign-Class%203-Public-Primary-Certification-Authority-G5.pem -O rootCA.pem
```

We have now a client certificate for the bridge associated with an IAM policy
giving permissions to the bridge. To get the bridge connected configure the
mosquitto broker appropriately for the certificates and some bridging rules.

The sample content in `mosquitto-bridge-sample.conf` is mapped into the default
`mosquitto.conf` and adapted to the above used docker volume mapping.

Set the bridge target address appropriately to the AWS IoT broker at

```bash
XXXXXXXXXX.iot.eu-central-1.amazonaws.com:8883
```

You can get the endpoint address by using the AWS CLI command

```bash
aws iot describe-endpoint
```

## AWS CDK stack

This demo currently focused on the bridge setting.

Next step is to refine this by creating "Things" for AWS IoT.

