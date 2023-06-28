# Base image
FROM xxxx

# Set maintainer
MAINTAINER lynnhtetaung@s.okayama-u.ac.jp

# Install database management system
RUN apt-get install -y curl && curl -sL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -y nodejs

# Set working directory
WORKDIR /usr/src/app

# Copy application code
COPY . /usr/src/app

# Install dependencies
RUN npm install

# Expose ports
EXPOSE 4000

# Start the application
CMD ['npm', 'start']