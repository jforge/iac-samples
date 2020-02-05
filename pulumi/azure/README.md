# Microsoft Azure samples

Some serverless examples with Azure

## Azure Account Setup

Install Azure CLI, pyenv, select python 3:

```bash
brew update && brew install azure-cli
```

Upgrade Python 3 if necessary

```bash
brew update && brew install python3 && brew upgrade python3
brew link --overwrite python3
```

Authorize Azure CLI:

```bash
az login
```

After authorization verify settings:

```bash
az account list
```

Profile and metadata are stored in the local user folder `~/.azure`.

## Azure Documentation

- [Azure CLI](https://docs.microsoft.com/de-de/cli/azure/?view=azure-cli-latest)

## Working with Azure

WIP
