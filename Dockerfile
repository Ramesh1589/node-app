# Set the base image to Ubuntu
FROM ubuntu:latest

# File Author / Maintainer
MAINTAINER Ramesh Rathod


# Install Utilities
RUN apt-get update -q  \
    && apt-get install -yqq \
    curl \
    git \
    ssh \
    gcc \
    make \
    build-essential \
    libkrb5-dev \
    sudo \
    apt-utils \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

#RUN apt-get -y install python build-essential nodejs
    

# Install nodejs
#RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

#RUN sudo apt-get install -y nodejs nginx build-essential g++ node-gyp 


# Create app directory
WORKDIR /node-app

    COPY app.conf /etc/nginx/conf.d/app.conf

# To verify nginx configuration
RUN sudo nginx -t

# Restart nginx
RUN sudo service nginx restart

# Install app dependencies
# where available (npm@5+)
COPY package.json ./

# Install APP Prerequisites
RUN npm install --production

RUN npm install --quiet -g nodemon pm2 && npm cache clean

# Bundle app source
COPY . .

# 80 = HTTP, 443 = HTTPS, 8000 = server
EXPOSE 80 443 8000


# Set development environment as default
ENV NODE_ENV development

CMD npm dev

