#!/usr/bin/env bash
#
# Generate Speech MP3 from (SSML'ed) Text
#
# Polly Languages: https://docs.aws.amazon.com/de_de/polly/latest/dg/SupportedLanguage.html
# Polly CLI, SSML: https://docs.aws.amazon.com/polly/latest/dg/ssml-synthesize-speech-cli.html
#

SAMPLE_TEXT_de_DE='<speak>Moin Moin</speak>'
SAMPLE_TEXT_da_DK='<speak>Hej Hej</speak>'
SAMPLE_TEXT_en_US='<speak>Hello world</speak>'

VOICE_ID_DE=Hans
VOICE_ID_DK=Mads
VOICE_ID_EN=Joanna

for i in de-DE,$VOICE_ID_DE da-DK,$VOICE_ID_DK en-US,$VOICE_ID_EN;
do
  LANGUAGE=${i%,*}
  VOICE_ID=${i#*,}
  TEXT_VAR=SAMPLE_TEXT_${LANGUAGE/-/_}
  echo
  echo "Language: $LANGUAGE"
  echo "Voice-Id: $VOICE_ID"
  echo "Text Env: $TEXT_VAR"

  SPEECH_FILE_NAME=speech_$LANGUAGE.mp3
  echo "Target MP3 File: $SPEECH_FILE_NAME"

  echo "Sample Text:"
  echo ${!TEXT_VAR}

  aws polly synthesize-speech \
  --language-code $LANGUAGE \
  --voice-id $VOICE_ID \
  --output-format mp3 \
  --text-type ssml \
  --text "${!TEXT_VAR}" \
  $SPEECH_FILE_NAME


done
