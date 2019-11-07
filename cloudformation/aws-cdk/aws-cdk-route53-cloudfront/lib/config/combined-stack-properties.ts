import {StackProps} from '@aws-cdk/core';
import {IBucket} from '@aws-cdk/aws-s3';
import {NestedStackProps} from "@aws-cdk/aws-cloudformation";

export default interface MultiStackProps extends StackProps, NestedStackProps {
  usePredefinedZone?: boolean
  userBucket?: IBucket
  primaryHostedZoneName?: string
  siteDomain?: string
}
