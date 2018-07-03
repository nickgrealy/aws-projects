
FROM ubuntu:18.04
MAINTAINER nickgrealy@gmail.com

# docker build -t steam/base:1.0 .

# Setup environment variables...
ENV USER steam
ENV HOME /home/$USER
ENV GAME_DIR $HOME/GAME_DIR

# Limit apt-get sources...
RUN echo deb http://archive.ubuntu.com/ubuntu/ bionic main restricted > "./ubuntu-sources.list" \ 
    && apt-get update --no-install-recommends --assume-yes \
    --option Dir::Etc::sourcelist="./ubuntu-sources.list" \
    --option Dir::Etc::sourceparts="-" \
    --option APT::Get::List-Cleanup="0"

# Install dependencies...
RUN apt-get install --no-install-recommends --assume-yes \
    ca-certificates \
    sudo \
    curl \
    net-tools \
    lib32gcc1 \
    lib32stdc++6 \
    && rm -rf /var/lib/apt/lists/*

# Setup user...
RUN mkdir -p "$GAME_DIR" \
    && useradd $USER \
    # && adduser $USER sudo \
    && chown -R $USER:$USER $HOME 

USER $USER
WORKDIR $HOME

# Install steamcmd...
RUN curl http://media.steampowered.com/client/steamcmd_linux.tar.gz | tar -C $HOME -xvz
    
