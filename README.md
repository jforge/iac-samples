# IaC samples for the Amazon Cloud Services

Infrastructure as Code examples demonstrating 
[Terraform](https://www.terraform.io), 
[Cloudformation](https://aws.amazon.com/de/cloudformation/)
and higher level development kits (frameworks and tools) to avoid handwritten IaC descriptors.

The following list raises no claims on completeness (please open an issue or a pull request for enhancements).

## Cloudformation

Handwritten [Cloudformation](https://aws.amazon.com/de/cloudformation/) templates is [classified as HOLD on the Thoughtworks Tech Radar](https://www.thoughtworks.com/de/radar/tools/handwritten-cloudformation) for good reasons.

Writing Cloudformation Templates for complex infrastructure is well known and works like a charm... and it can be configuration hell depending on the complexity of your infrastructure.

In the end, one may state: "We want Infrastructure as Code, not Infrastructure as Text" (Thanks to [Jack](https://twitter.com/jforge/status/1183663187037773824) for this one).

In short the following tools finally produce Cloudformation Templates, provide (structural) shortcuts to Cloudformation and offer high-level development capabilities.

### AWS Cloud Development Kit

[AWS CDK Homepage](https://aws.amazon.com/de/cdk/)

This is the "official" Amazon way to use modern programming languages for convenient infrastructure deployment.

It has a developer friendly CLI and comes with support for several programming languages: 
By default TypeScript resp. JavaScript, Python, Java, .NET/C#.

To get familiar with it, visit the [CDK Workshop](https://cdkworkshop.com/) for Typescript or Python-based introduction.

With a clear demand for using AWS this may be a preferred way to work with IaC.


### CFN Modules

Similar to Terraoform then project [CFN Modules](https://github.com/cfn-modules) provides a way to work with
modularization within Cloudformation.

See the [CFN Introduction](https://cloudonaut.io/easy-going-aws-cloudformation-cfn-modules/) for details.

Being familiar with Terraform this project may have the lowest conceptual obstacle.


### Troposphere

[Troposhere Homepage](https://github.com/cloudtools/troposphere).

This is a Python-based tool being around for quite some time and [good reputation](https://medium.com/@sobisw/aws-cloudformation-template-creation-using-troposphere-fdec2c5964b1).

If you are familiar with Python, this mature tool may be a good option.

### Sceptre

[Sceptre](https://sceptre.cloudreach.com) is another tool to drive CloudFormation also being around since 2017.

[Insights](https://www.cloudreach.com/en/insights/blog/sceptre-a-tool-for-driving-aws-cloudformation/) 
and [Github](https://github.com/Sceptre/sceptre).

It has a Python background and provides support for templates written in JSON, YAML, Jinja2 or Python DSLs such as [Troposphere](https://github.com/cloudtools/troposphere).


### Stack Deployment Tool

[Stack Deployment Tool](https://github.com/capitalone/stack-deployment-tool) is another option to simply the work with Cloudformation templates.

This is part of the Open Source projects of [Capital One](https://developer.capitalone.com/resources/open-source)

## Terraform

[Terraform](https://www.terraform.io) may be rated as some incumbent of IaC tools.

It's widely adopted, and with a least the [Hashicorp Language (HCL)](https://www.terraform.io/docs/configuration/index.html), [modularization](https://www.terraform.io/docs/configuration/modules.html) aspects and the like. 

Terraform is a well-known good practice to work on infrastructure and widely integrated with other tools and cloud environments, see for example the [Pulumi Terraform Bridge](https://github.com/pulumi/pulumi-terraform).


## Multi-Cloud and other/classic IaC tools

Multi Cloud, Hybrid and [Private Cloud](https://opennebula.org/) approaches address the need to deploy infrastructure not only on dedicated hardware, your own on-premise datacenters etc. but also to any cloud provider environments (maybe due to a policy to avoid Vendor Lock-in or simply global operative requirements).

### Pulumi

The [Pulumi Homepage](https://www.pulumi.com) describe itself as

> Modern Infrastructure as Code.
> Declare cloud infrastructure using real languages. 
> Enable developers and operators to work better together.

Which in short summarizes today's developer orientiation concerning cloud native company strategies.

See [Github](https://github.com/pulumi/) to get started.


### More on IaC

A (non-curated) list of classic Infrastructure as Code tools and discussion about IaC can be found in a [Thorntech article](https://www.thorntech.com/2018/04/15-infrastructure-as-code-tools/).

Another approach and alternative platform is [Cloudfoundry](https://www.cloudfoundry.org/) ([Node.js Sample](https://github.com/cloudfoundry-samples/cf-sample-app-nodejs)):

> Cloud Foundry is an open source, multi-cloud application platform as a service governed by the Cloud Foundry Foundation.

Also see [More cloud tools and helpers](https://github.com/cloudtools).

