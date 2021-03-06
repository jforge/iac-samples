import { expect as expectCDK, matchTemplate, MatchStyle, haveResource, haveResourceLike, SynthUtils } from '@aws-cdk/assert';
import { App, Stack } from '@aws-cdk/core';
import SpeechSynthesis = require('../lib/speech-synthesis-stack');

function createTestStack(app: App): Stack {
  return new SpeechSynthesis.SpeechSynthesisStack(app, 'SpeechSynthesisTestStack');
}

describe('Synthesized template can be created', () => {
  it('should not be empty', () => {
    const app: App = new App();
    // WHEN
    const stack: Stack = createTestStack(app);
    // THEN
    expectCDK(stack).notTo(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
  });

  it('should contain a DynamoDB resource', () => {
    const app: App = new App();
    // WHEN
    const stack: Stack = createTestStack(app);
    // THEN
    expectCDK(stack).to(haveResource("AWS::DynamoDB::Table", {
      BillingMode: "PAY_PER_REQUEST"
    }));
  });

  it('should contain a SSM parameter resource', () => {
    const app: App = new App();
    // WHEN
    const stack: Stack = createTestStack(app);
    // THEN
    expectCDK(stack).to(haveResource("AWS::SSM::Parameter", {
      Value: "Speech-Synthesis-Data"
    }));
  });

  it('should contain a S3 Bucket resource', () => {
    const app: App = new App();
    // WHEN
    const stack: Stack = createTestStack(app);
    // THEN
    expectCDK(stack).to(haveResource("AWS::S3::Bucket", {
      BucketName: "speech-synthesis-storage"
    }));
  });
});

describe("CDK synthesis result", () => {

  it('should define 2 artifacts and 1 stack', () => {
    const app: App = new App();
    // WHEN
    const stack: Stack = createTestStack(app);
    const assembly = app.synth();

    // THEN
    expect(assembly.artifacts).toHaveLength(2);
    expect(assembly.stacks).toHaveLength(1);
  });

  it('should match the snapshot', () => {
    const app: App = new App();
    // WHEN
    const stack: Stack = createTestStack(app);
    // THEN
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});
