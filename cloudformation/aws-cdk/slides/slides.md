---
title: Foobar
separator: <!--h-->
verticalSeparator: <!--v-->
theme: solarized
    # black, white, league, sky, beige, simple, serif, blood, night, moon, solarized
revealOptions:
    #transition: none, fade, slide, convex, concave, zoom
    transition: zoom
    slideNumber: true

---
<!-- .slide: data-background="images/aws-cdk-ga.jpg" -->

Note: ![cdk-logo](images/aws-cdk-logo.png)

<!--h-->

# Agenda

* Warum Infrastruktur mit Code?
* Was gibt es bereits für AWS?
* Prinzip, Lifecycle, Projektaufbau
* Setup, Demos
* Testing
* Tools: Cfn-Disassembler, Jsii
* Construct Library
* Ausblick

<!--h-->

## Infrastructure

Warum Infrastruktur -as- with Code?

Note: Intention, Thoughtworks Tech Radar notes about handwritten Cfn

<!--h-->

![cat](images/cat.jpg)

Note: Erwartung und AWS Angebote

<!--v-->

## Werkzeuge

Was gibt es bereits für AWS?

* Pulumi
* Troposhere
* Sceptre
* Cfn Modules
* ...

Note: From Troposphere to Pulumi, Python-based tools, Cfn modularizers, multi-cloud tools

<!--h-->

Was ist AWS CDK?

> AWS Cloud Development Kit ist ein Open-Source-Framework für die Softwareentwicklung.
> Damit lässt sich Cloud-Infrastruktur als Code mit modernen Programmiersprachen definieren und über AWS Cloudformation bereitstellen.
>

<!--h-->

## Funktionsprinzip

![principle](images/cdk-functional-principle.png)

<!--v-->

Erwartete Qualität & AWS Abdeckung

![expected_state](images/shutterstock_383893378.jpg)

<!--v-->

Aktueller Zustand (stabil) & Abdeckung (teilweise)

![current_state](images/shutterstock_112600436.jpg)

<!--h-->

## Lifecycle

<!--h-->

## Projektaufbau

<!--h-->

## Setup

<!--h-->

## Demos

<!--v-->

## Demo: Polyglotte blueprints

<!--h-->

## Demo: SPA deployment auf AWS S3

Eine Vue.js App mit API-Zugriff

<!--h-->

## Testing

<!--h-->

## Tools

<!--v-->

## Tool: Disassembler cdk-dasm

* Cloudformation Disassembler
* mbler
* Generate code from Cfn Teampltes
* Not recommended, useful to get started
* [NPM Package cdk-asm](https://npmjs.com/package/cdk-dasm)
  
```bash
cdk-dasm < any-stack-template.json > any-stack.ts
```

<!--v-->

## Tool: AWS Jsii

* Deliver polyglot libraries from a single codebase
* Typescript
* [Github AWS Jsii](https://github.com/aws/jsii)

```bash
npm init -y
npm i --save-dev jsii jsii-pacmak
# now configure package.json for polyglot output
npm run build
npm run package
```

<!--h-->

## Construct Bibliotheken

<!--h-->

## Ausblick

<!--h-->

Vielen Dank für Eure Aufmerksamkeit

* E-mail: klaus@pittig.de
* Twitter, Github: @jforge
