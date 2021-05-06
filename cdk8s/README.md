# CDK8s playground

Samples for using CDK8s with any kubernetes engine.

## Setup

```bash
npm install -g cdk8s-cli
```

## Create a project

```bash
mkdir quickstart && cd quickstart
cdk8s init typescript-app
```

The resulting projects provides hints to proceed:

```
Your cdk8s typescript project is ready!

   cat help         Print this message

  Compile:
   npm run compile     Compile typescript code to javascript (or "yarn watch")
   npm run watch       Watch for changes and compile typescript in the background
   npm run build       Compile + synth

  Synthesize:
   npm run synth       Synthesize k8s manifests from charts to dist/ (ready for 'kubectl apply -f')

 Deploy:
   kubectl apply -f dist/*.k8s.yaml

 Upgrades:
   npm run import        Import/update k8s apis (you should check-in this directory)
   npm run upgrade       Upgrade cdk8s modules to latest version
   npm run upgrade:next  Upgrade cdk8s modules to latest "@next" version (last commit)

```
## Deploy resources

```bash
kubectl apply -f dist/*.k8s.yaml
```

## Destroy resources

```bash
kubectl delete -f dist/*.k8s.yaml
```

## CDK8s documentation

- [CDK8s Docs](https://cdk8s.io/docs/)
