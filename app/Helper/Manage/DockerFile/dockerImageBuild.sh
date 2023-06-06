 #!/bin/bash

    set -x #echo on

    variableA=$(docker build -f di-build/openpose-gpu.dockerfile . -t 24091997/dig:openpose-gpu --network=host --no-cache)

    echo "$variableA"

    cat myPassword.txt | docker login --username 24091997 --password-stdin

    docker image push 24091997/dig:openpose-gpu

