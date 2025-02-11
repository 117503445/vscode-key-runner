#!/usr/bin/env sh

set -e

docker build -t 117503445/vscode-key-runner-builder -f builder.Dockerfile .
docker run -v $(pwd):/workspace --rm 117503445/vscode-key-runner-builder