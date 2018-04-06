
FROM ubuntu:18.04
MAINTAINER nickgrealy@gmail.com

# Setup environment variables...
ENV USER csgo
ENV HOME /home/$USER
ENV DOCKER $HOME/docker
ENV GAMEDIR $HOME/csgo
ENV SOURCES ubuntu-sources.list
ENV STEAMKEY VALUE_NOT_SET!
ENV RUN_STEAM_UPDATE $HOME/steamcmd.sh +runscript $DOCKER/csgo/csgo_ds.txt
# export USER=csgo
# export HOME=/home/$USER
# export DOCKER=$HOME/docker
# export GAMEDIR=$HOME/csgo
# ./steamcmd.sh +runscript /home/csgo/docker/csgo/csgo_ds.txt

# Copy docker directory into the image...
COPY docker $DOCKER

# Limit apt-get sources...
RUN apt-get update --no-install-recommends --assume-yes \
    --option Dir::Etc::sourcelist="$DOCKER/$SOURCES" \
    --option Dir::Etc::sourceparts="-" \
    --option APT::Get::List-Cleanup="0"

# Install dependencies...
RUN apt-get install --no-install-recommends --assume-yes \
    ca-certificates \
    # sudo=1.8.21p2-3ubuntu1 \
    curl=7.58.0-2ubuntu3 \
    net-tools=1.60+git20161116.90da8a0-1ubuntu1 \
    lib32gcc1=1:8-20180402-1ubuntu1 \
    lib32stdc++6=8-20180402-1ubuntu1 \
    && rm -rf /var/lib/apt/lists/*

# Setup user...
RUN useradd $USER \
    # && adduser $USER sudo \
    && chown -R $USER:$USER $HOME

# Install the steam server...
USER $USER
WORKDIR $HOME
RUN curl http://media.steampowered.com/client/steamcmd_linux.tar.gz | tar -C $HOME -xvz
# RUN $RUN_STEAM_UPDATE
# RUN mkdir -p $HOME/.steam/sdk32 && ln -s $GAMEDIR/bin/steamclient.so $HOME/.steam/sdk32/steamclient.so

# # Copy config files
# RUN cp $DOCKER/csgo/gamemodes_server.txt $GAMEDIR/csgo/gamemodes_server.txt \
#     && cp $DOCKER/csgo/autoexec.cfg $GAMEDIR/csgo/cfg/autoexec.cfg \
#     && cp $DOCKER/csgo/server.cfg $GAMEDIR/csgo/cfg/server.cfg

# TODO Update server password...

# csgo/srcds_run -game csgo -tickrate 128 -autoupdate -steam_dir ~/hlserver -steamcmd_script ~/hlserver/csgo_ds.txt $@

EXPOSE 27015/udp

# ENTRYPOINT ["sh", "-c", "$GAMEDIR/srcds_run -game csgo -console -usercon +game_type 0 +game_mode 0 +mapgroup mg_active +map de_dust2 +sv_setsteamaccount $STEAMKEY"]

# $GAMEDIR/srcds_run -game csgo -tickrate 128 -autoupdate -steam_dir ~/hlserver -steamcmd_script ~/hlserver/csgo_ds.txt
#  -game csgo -console -usercon +game_type 0 +game_mode 0 +mapgroup mg_active +map de_dust2 +sv_setsteamaccount "$STEAM_GAME_KEY"
# ENTRYPOINT ["/bin/echo"]
# CMD ["-steamcmd_script", "$DOCKER/csgo/csgo_ds.txt", "-game", "csgo", "-console" "-usercon" "+game_type" "0" "+game_mode" "1" "+mapgroup" "mg_active" "+map" "de_dust2"]
# +sv_setsteamaccount "$STEAM_GAME_KEY"
