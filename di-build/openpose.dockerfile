FROM bvlc/caffe:gpu
LABEL maintainer openpose
RUN git clone  https://github.com/CMU-Perceptual-Computing-Lab/openpose.git
RUN ln -s /software/openpose/build/examples/openpose/openpose.bin
RUN ln -s /software/openpose/models /workspace/models
RUN ln -s /software/openpose/build/examples /workspace/examples