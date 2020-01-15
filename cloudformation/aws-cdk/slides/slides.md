---
title: AWS Cloud Development Kito
separator: <!--horizontal_slide-->
verticalSeparator: <!--vertical_slide-->
theme: solarized
    # black, white, league, sky, beige, simple, serif, blood, night, moon, solarized
    # https://github.com/hakimel/reveal.js/tree/master/css/theme
highlightTheme: zenburn
    # zenburn, github, arduino-light, tomorrow, nord, obsidian, ocean, school-book,
    # sunburst, solarized-dark, solarized-light, rainbox, xcode, paraiso-light, far, ...
    # https://github.com/highlightjs/highlight.js/tree/master/src/styles
revealOptions:
    #transition: none, fade, slide, convex, concave, zoom
    transition: zoom
    slideNumber: true
    showNotes: false

---
<!-- .slide: data-background="images/background/aws-cdk-ga.jpg" -->

Note: ![cdk-logo](images/aws-cdk-logo.png)

<!--horizontal_slide-->

<!-- .slide: data-background="white" -->

<img style="border: none; box-shadow: none; height: 60%; width: 60%" src="images/iw-fb-wo-stackst-du.png" />

<!--vertical_slide-->

<!-- .slide: data-background="white" -->

<img style="border: none; box-shadow: none" src="images/iw-logo.svg" />

[https://bit.ly/387MHF0](https://bit.ly/387MHF0)

<!--horizontal_slide-->

## Agenda

* Warum Infrastruktur mit Code?
* Was gibt es bereits für AWS?
* Prinzip, Lifecycle, Projektaufbau
* Setup, Demos
* Testen
* Weitere Werkzeuge
* Konstruktbibliotheken
* Ausblick

<!--horizontal_slide-->

## Infrastructure

Warum Infrastruktur <del>as</del> with Code?

Note: Intention, Thoughtworks Tech Radar notes about handwritten Cfn

<!--horizontal_slide-->

![cat](images/cat.jpg)

Note: Erwartung und AWS Angebote

<!--vertical_slide-->

## Werkzeuge

Was gibt es bereits für AWS?

* Pulumi
* Troposhere
* Sceptre
* Cfn Modules
* ...

Note: From Troposphere to Pulumi, Python-based tools, Cfn modularizers, multi-cloud tools

<!--vertical_slide-->

![cdk-project](images/aws-infra-deployment-evolution.png)

<!--horizontal_slide-->

Was ist AWS CDK?

AWS Cloud Development Kit ist ein Open-Source-Framework für die Softwareentwicklung.
Damit lässt sich Cloud-Infrastruktur als Code mit modernen Programmiersprachen definieren und über AWS Cloudformation bereitstellen.
>

<!--horizontal_slide-->

## Funktionsprinzip

![principle](images/cdk-functional-principle.png)

<!--vertical_slide-->

Erwartete Qualität & AWS Abdeckung

![expected_state](images/shutterstock_383893378.jpg)

<!--vertical_slide-->

Aktueller Zustand (stabil) & Abdeckung (teilweise)

![current_state](images/shutterstock_112600436.jpg)

<!--horizontal_slide-->

## Lebenszyklus

![cdk-lifecycle](images/aws-cdk-lifecycle.png)

<!--horizontal_slide-->

## Projektaufbau

![cdk-project](images/aws-cdk-project-hierarchy.png)

<!--vertical_slide-->

![cdk-project](images/aws-cdk-project-hierarchy2.png)

<!--horizontal_slide-->

## Setup

<!--horizontal_slide-->

## Demos

<!--vertical_slide-->

## Demo: Polyglotte blueprints

<!--horizontal_slide-->

## Demo: SPA deployment auf AWS S3

Eine Vue.js App mit API-Zugriff

<!--horizontal_slide-->

## Testing

<!--horizontal_slide-->

## Tools

* Frag 1 <!-- .element: class="fragment" -->
* Frag 2 <!-- .element: class="fragment" -->

<!--vertical_slide-->

## Tool: Disassembler cdk-dasm

* Cloudformation Disassembler
* Generate code from Cfn Teamplates
* Not recommended, useful to get started
* [NPM Package cdk-asm](https://npmjs.com/package/cdk-dasm)
  
```bash
cdk-dasm < any-stack-template.json > any-stack.ts
```

<!--vertical_slide-->

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

<!--horizontal_slide-->

## AWS Construct Library

AWS CDK-Konstrukte werden in der AWS Construct Library bereitgestellt.

Sie sind Abstrahierungen von Cloud-Infrastrukturlogik.

Konstrukte können lokal definiert oder in Paketmanagern wie npm, Maven, NuGet oder PyPI veröffentlicht und verteilt werden.

<!--horizontal_slide-->

## Ausblick

<!--horizontal_slide-->

<!-- .slide: data-background="images/background/shutterstock_1173155356.jpg" -->

Vielen Dank für Eure Aufmerksamkeit

* E-mail: klaus@pittig.de
* Twitter, Github: @jforge
