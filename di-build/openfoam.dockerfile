FROM ubuntu:focal
ENV DEBIAN_FRONTEND=noninteractive
# RUN apt-get update \\ \t&& apt-get install -y vim curl sudo
# RUN useradd --user-group --create-home --shell /bin/bash foam ;\\ \techo \foam ALL=(ALL) NOPASSWD:ALL\ >> /etc/sudoers
# RUN curl -s https://dl.openfoam.com/add-debian-repo.sh | bash ;\\ \tapt-get install -y openfoam2006 openfoam2006-tutorials ;\\ \trm -rf /var/lib/apt/lists/* ;\\ \techo \source /usr/lib/openfoam/openfoam2006/etc/bashrc\ >> ~foam/.bashrc ;\\ \techo \export OMPI_MCA_btl_vader_single_copy_mechanism=none\ >> ~foam/.bashrc
USER foam