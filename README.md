# Infrastructure as Code samples

## Infrastructure is/with Code

Some notes about "coding" infrastructure instead of using markup-like yaml, json or low-level 
cloud-provider template languages. This becomes more and more interesting since 2019, especially 
with AWS Cloud Development Kit, Pulumi etc.

Purpose: Learn to create Multi-Cloud native applications including their infrastructure with one 
preferred programming language.

### Advantages

Do not learn markup languages changing over the years, do not lock yourself into cloud-provider 
specific languages (even one can't avoid cloud-provider specific SDKs), just use your or your 
team's preferred programming language for everything. Using a "regular" programming language 
allows using "natural" logic, unit-testing, modularization... 
all the cool clean-code stuff we learned as best practice can be applied.

### Possible Disadvantages

You may need to learn a new SDK/API and live with lack of completeness concerning the cloud provider's
new hot stuff, and your "preferred" programming language for everything needs to be one of these 
depending on toolkit and time: .NET Core Languages (C#, F#...) Go, Java, Python, 
Typescript/Javascript (alphabetical order, not weighted by value). 
There may also be "other" types of erroneous behaviour compared to a pure descriptive template language.
Your modularization concept may not match the "programmed" one.

## IaC samples for the Amazon Cloud Services

Infrastructure as Code examples demonstrating [Terraform](https://www.terraform.io), 
[Cloudformation](https://aws.amazon.com/de/cloudformation/) and higher level development kits 
(frameworks and tools) to avoid handwritten IaC descriptors.

The following list raises no claims on completeness (please open an issue or a pull request for enhancements).

### Cloudformation

Writing Cloudformation Templates for complex infrastructure is well known and works like a charm...
and it can be configuration hell depending on the complexity of your infrastructure.

Beside the template language for Cloudformation driven Infrastructure, AWS offers 
the Cloud Development Kit (CDK) with Typescript as the default language with full AWS SDK support.

Handwritten [Cloudformation](https://aws.amazon.com/de/cloudformation/) templates is
[classified as HOLD on the Thoughtworks Tech Radar](https://www.thoughtworks.com/de/radar/tools/handwritten-cloudformation) for good reasons.

In the end, one may state: "We want Infrastructure as Code, not Infrastructure as Text" 
(Thanks to [Jack](https://twitter.com/jforge/status/1183663187037773824) for this one).

The following tools finally produce Cloudformation Templates, provide (structural) shortcuts 
to Cloudformation and offer high-level development capabilities.

#### SAM

#### Serverless

If you focus on serverless computing, use Serverless. This simplifies a lot, but may not be enough. 
If it's not enough for your use-case, DO NOT mix this, instead use a higher level toolkit.

#### AWS Cloud Development Kit

[AWS CDK Homepage](https://aws.amazon.com/cdk/)

This is the "official" Amazon way to use modern programming languages for convenient infrastructure deployment.

It has a developer friendly CLI and comes with support for several programming languages: 
By default TypeScript resp. JavaScript, Python, Java, .NET/C#.

To get familiar with it, visit the [CDK Workshop](https://cdkworkshop.com/) for Typescript or Python-based introduction.

With a clear demand for using AWS this may be a preferred way to work with IaC.

#### CFN Modules

Similar to Terraform then project [CFN Modules](https://github.com/cfn-modules) provides a way
to work with modularization within Cloudformation.

See the [CFN Introduction](https://cloudonaut.io/easy-going-aws-cloudformation-cfn-modules/) for details.

Being familiar with Terraform this project may have the lowest conceptual obstacle.

#### Troposphere

[Troposphere Homepage](https://github.com/cloudtools/troposphere).

This is a Python-based tool being around for quite some time and 
[good reputation](https://medium.com/@sobisw/aws-cloudformation-template-creation-using-troposphere-fdec2c5964b1).

If you are familiar with Python, this mature tool may be a good option.

#### Sceptre

[Sceptre](https://sceptre.cloudreach.com) is another tool to drive CloudFormation, also being around since 2017.

See [Insights](https://www.cloudreach.com/en/insights/blog/sceptre-a-tool-for-driving-aws-cloudformation/) 
and [Github](https://github.com/Sceptre/sceptre).

It has a Python background and provides support for templates written in JSON, YAML, Jinja2 or 
Python DSLs such as [Troposphere](https://github.com/cloudtools/troposphere).

#### Stack Deployment Tool

[Stack Deployment Tool](https://github.com/capitalone/stack-deployment-tool) is another option 
to simplify the work with Cloudformation templates.

This is part of the Open Source projects of [Capital One](https://developer.capitalone.com/resources/open-source)

### Terraform

[Terraform](https://www.terraform.io) may be rated as some incumbent of IaC tools.

It has been the best tool for infrastructure for years now, is widely adopted, written with the
[Hashicorp Language (HCL)](https://www.terraform.io/docs/configuration/index.html), offers 
understandable [modularization](https://www.terraform.io/docs/configuration/modules.html), supports 
multiple cloud providers, and the descriptors appear tidier than e.g. pure Cloudformation templates.

Terraform is a well-known good practice to work on infrastructure and widely integrated with other tools
and cloud environments, see for example the [Pulumi Terraform Bridge](https://github.com/pulumi/pulumi-terraform).

### Multi-Cloud and other/classic IaC tools

Multi Cloud, Hybrid and [Private Cloud](https://opennebula.org/) approaches address the need to deploy
infrastructure not only on dedicated hardware, your own on-premise datacenters etc. but also to any cloud
provider environments (maybe due to policy to avoid Vendor Lock-in or simply global operative requirements).

#### Pulumi

The [Pulumi Homepage](https://www.pulumi.com) describe itself as

> Modern Infrastructure as Code.
> Declare cloud infrastructure using real languages. 
> Enable developers and operators to work better together.

This in short summarizes today's developer orientation concerning cloud native company strategies.

See [Github](https://github.com/pulumi/) to get started.

See [Heise about Pulumi 1.0 (2019-09)](https://www.heise.de/developer/meldung/Infrastructure-as-Code-Die-Plattform-Pulumi-erreicht-Version-1-0-4516570.html)

### OpenWhisk

This is an Open Source Could platform, coming as an extraction from the IBM Cloud universe.

See [Apache OpenWhisk](https://openwhisk.apache.org/) for details.

See [IBM Cloud Functions](https://www.ibm.com/de-de/cloud/functions) to get started.

#### More on IaC

A (non-curated) list of classic Infrastructure as Code tools and discussion about IaC 
can be found in a [Thorntech article](https://www.thorntech.com/2018/04/15-infrastructure-as-code-tools/).

Another approach and alternative platform is [Cloudfoundry](https://www.cloudfoundry.org/) 
([Node.js Sample](https://github.com/cloudfoundry-samples/cf-sample-app-nodejs)):

> Cloud Foundry is an open source, multi-cloud application platform as a service governed by the Cloud Foundry Foundation.

Also see:
- [More cloud tools and helpers](https://github.com/cloudtools).
- [Popular open source tools for managing the cloud](https://sudonull.com/posts/6606-Popular-open-source-part-two-5-tools-for-managing-the-cloud)


## IaC samples for the Microsoft Azure Services

### Setup Azure CLI

In case of not using Docker or browser based tools:

```bash
brew update && brew install azure-cli
```

Test:

```bash
az account list
```

## IaC samples for the Google Cloud Service

### Setup Google Cloud CLI

In case of not using Docker or Google Cloud Shell:

```bash
brew cask install gcloud
```

At the time of writing Python 2 is required to use the complete 
feature stack of Google Cloud.

Use Pyenv for multiple Python versions, install at least one LTS
Python 2 and Python 3 version and select the required version locally: e.g.

```bash
pyenv local 2.7.16
```

If this version is installed using pyenv, the command creates 
a file `.python-version` in the local filesystem. Ensure either
an appropriate development guide or commit it to your SCM.

Test:

```bash
gcloud info
```

## IaC samples for Kubernetes

Kubernetes is a container-orchestration tool and widely used especially on cloud infrastructures.

See [Kubernetes.io](https://kubernetes.io) for details.

### CDK8s

The team around [AWS CDK](https://aws.amazon.com/cdk/) derived another toolkit following the idea
of writing infrastructure as code in different regular programming languages instead of text (yaml).

It is called [CDK8s](https://cdk8s.io/) and can be used to deploy on any Kubernetes Cluster, 
not only the cloud provider solutions like Amazon EKS or Google GKE.

Follow the docs and samples on the CDK8s website to create Kubernetes pods.
