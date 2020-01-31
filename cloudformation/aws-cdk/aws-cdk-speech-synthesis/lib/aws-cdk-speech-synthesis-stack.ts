import * as cdk from '@aws-cdk/core';
import * as sns from '@aws-cdk/aws-sns';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as sqs from '@aws-cdk/aws-sqs';

export class AwsCdkSpeechSynthesisStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // WIP

    const queue = new sqs.Queue(this, 'AwsCdkPollyQueue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });

    const topic = new sns.Topic(this, 'AwsCdkPollyTopic');

    topic.addSubscription(new subs.SqsSubscription(queue));

  }
}
