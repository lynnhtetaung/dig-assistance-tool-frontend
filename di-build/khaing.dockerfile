FROM ubuntu:16.04
MAINTAINER Java <clh960524@gmail.com>
ENV TEMP_MRCNN_DIR /tmp/mrcnn
EXPOSE 4404
RUN mkdir java
WORKDIR /root
CMD ['/bin/bash']