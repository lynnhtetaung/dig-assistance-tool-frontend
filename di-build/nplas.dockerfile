FROM openjdk:16-slim-buster
MAINTAINER soethandar@s.okayama-u.ac.jp
RUN apt-get update; apt-get install -y curl \\     && curl -sL https://deb.nodesource.com/setup_14.x | bash - \\     && apt-get install -y nodejs \\     && curl -L https://www.npmjs.com/install.sh | sh
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
EXPOSE 3000
CMD [\npm\
\start\]