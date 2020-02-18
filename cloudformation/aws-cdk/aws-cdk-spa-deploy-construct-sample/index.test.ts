
import { expect as expectCDK, matchTemplate, MatchStyle, haveResource, SynthUtils } from '@aws-cdk/assert';
import { App, Stack } from '@aws-cdk/core';
import { SpaDeployStack } from './index';

function createTestStack(app: App): Stack {
  return new SpaDeployStack(app, 'SpaDeployStack', {
    env: {
      account: '000000',
      region: 'us-east-1'
    }
  });
}

describe('Synthesized template can be created', () => {
  it('should be empty', () => {
    const app: App = new App();
    // WHEN
    const stack: Stack = createTestStack(app);
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
  });

  /*
  it('should contain a XYZ resource', () => {
    const app: App = new App();
    // WHEN
    const stack: Stack = createTestStack(app);
    // THEN
    expectCDK(stack).to(haveResource("AWS::DynamoDB::Table", {
      BillingMode: "PAY_PER_REQUEST"
    }));
  });
  */

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
