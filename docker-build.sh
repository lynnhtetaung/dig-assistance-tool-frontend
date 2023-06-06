#!/bin/bash

    set -x #echo on

    # docker file name and docker hub's workspace/repository:version
    variableA=$(docker build -f di-build/php.dockerfile . -t 24091997/dig:php)

    echo "$variableA"

    cat myPassword.txt | docker login --username 24091997 --password-stdin

    # docker hub's workspace/repository:version
    docker image push 24091997/dig:php

