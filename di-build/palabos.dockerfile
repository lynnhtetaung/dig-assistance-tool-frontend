FROM ubuntu:jammy
LABEL Palabos Docker image
# RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezones
# RUN apt install -y g++ clang clang-format-14 ccache cmake python3 make libopenmpi-dev libhdf5-dev libhdf5-mpi-dev doxygen imagemagick && update-alternatives --install /usr/bin/python python /usr/bin/python3 10
ENV TZ=Europe/Zurich
# RUN ln -s /usr/bin/clang-format-14 /usr/bin/clang-format