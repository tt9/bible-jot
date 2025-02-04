#!/bin/bash

# build client

# push the client directory for building in the 
# correct file context
pushd ./packages/bible-jot-client

# run the build command
# TODO: consider adding --no-cache
docker build -t bible-jot-client .

# return to original dir
popd


