#!/usr/bin/env bash
#
# Translate Text with AWS CLI
#
# Translate CLI: https://docs.aws.amazon.com/cli/latest/reference/translate/translate-text.html
# AWS Translate Languages: https://docs.aws.amazon.com/translate/latest/dg/what-is.html
#

SAMPLE_TEXT_de='Guten Tag, ich heiße Hans'
SAMPLE_TEXT_da='Goddag, jeg hedder Mads'
SAMPLE_TEXT_en='Good morning, my name is Alice'

for i in de,da da,de en,da;
do
  SOURCE_LANGUAGE=${i%,*}
  TARGET_LANGUAGE=${i#*,}
  TEXT_VAR=SAMPLE_TEXT_${SOURCE_LANGUAGE}
  echo
  echo "Source Language: $SOURCE_LANGUAGE"
  echo "Target Language: $TARGET_LANGUAGE"
  echo "Text Env: $TEXT_VAR"

  echo "Sample Text:"
  echo ${!TEXT_VAR}

  aws translate translate-text \
    --source-language-code $SOURCE_LANGUAGE \
    --target-language-code $TARGET_LANGUAGE \
    --text "${!TEXT_VAR}"
done
