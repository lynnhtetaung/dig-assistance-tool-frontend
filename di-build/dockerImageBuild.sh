 #!/bin/bash

    set -x #echo on

    variableA=$(docker build -f di-build/$DF_NAME.dockerfile . -t 24091997/dig:$DF_NAME --network=host --no-cache)

    echo "$variableA"

    cat myPassword.txt | docker login --username 24091997 --password-stdin

    docker image push 24091997/dig:$DF_NAME

