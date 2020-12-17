FROM node:14.15.1-stretch-slim AS node_14151

LABEL maintainer="Mario Maksimovikj <maki.makso@gmail.com>"
LABEL description="Frontend Development environment (stretch-slim based)."

# General system staff
RUN apt update && apt upgrade -y && apt autoremove -y && \
    apt install -my xvfb gnupg libfontconfig1 procps zip locales git tmux wget && \
    rm -rf /var/lib/apt/lists/* /var/cache/apt/*

# Google Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update -qqy \
    && apt-get -qqy install google-chrome-stable \
    && rm /etc/apt/sources.list.d/google-chrome.list \
    && rm -rf /var/lib/apt/lists/* /var/cache/apt/* \
    && sed -i 's/"$HERE\/chrome"/xvfb-run "$HERE\/chrome" --no-sandbox/g' /opt/google/chrome/google-chrome

RUN echo 'Europe/Skopje' > /etc/timezone
ENV TZ=Europe/Skopje
RUN echo 'en_US.UTF-8 UTF-8' > /etc/locale.gen
RUN locale-gen

# Frontend environment tools
RUN npm install -g @angular/cli
RUN npm install -g protractor
RUN webdriver-manager update

# Prepare dependencies path on the target
RUN mkdir -p /project/webapp/node_modules && chown -R node:node /project

# switch to normal user
USER node

# ---------------------------------- RMS Server UI ------------------------------------
FROM node_14151 AS scheduling-web
LABEL description="Scheduling UI frontend development environment."

# Frontend dependencies caching
COPY webapp/package.json /project/webapp/package.json
RUN cd /project/webapp && npm install

WORKDIR /project
