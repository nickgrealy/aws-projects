
FROM ubuntu:16.04
MAINTAINER nickgrealy@gmail.com

# docker build -t steam/base:1.0 .

USER root
ENV STEAMCMD /usr/games/steamcmd

# Minimise image size...
RUN dpkg --add-architecture i386 \
    # echo deb http://archive.ubuntu.com/ubuntu/ xenial main universe multiverse >> "./ubuntu-sources.list" \
    && apt-get update --no-install-recommends --assume-yes
    # --option Dir::Etc::sourcelist="./ubuntu-sources.list" \
    # --option Dir::Etc::sourceparts="-" \
    # --option APT::Get::List-Cleanup="0"

# Install steamcmd
RUN echo steam steam/question select "I AGREE" | debconf-set-selections \
&& echo steam steam/license note '' | debconf-set-selections \
&& apt-get install --no-install-recommends --assume-yes \
    ca-certificates \
    steamcmd \
    && rm -rf /var/lib/apt/lists/*

    # ca-certificates \
    # sudo \
    # curl \
    # net-tools \
    # lib32gcc1 \
    # lib32stdc++6 \