# Dockerfile to build DMTCP container images.
FROM ubuntu:15.04
MAINTAINER Kapil Arya <kapil@ccs.neu.edu>

RUN mkdir -p /dmtcp
RUN mkdir -p /tmp

WORKDIR /dmtcp

