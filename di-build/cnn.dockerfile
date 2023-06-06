FROM ubuntu:16.04
MAINTAINER Cuda Chen <clh960524@gmail.com>

ENV TEMP_MRCNN_DIR /tmp/mrcnn
ENV TEMP_COCO_DIR /tmp/coco
ENV MRCNN_DIR /mrcnn

# Expose port for TensorBoard
EXPOSE 6006

RUN mkdir -p $MRCNN_DIR/coco

WORKDIR "/root"
CMD ["/bin/bash"]
