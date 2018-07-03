
FROM steam/base:1.0
MAINTAINER nickgrealy@gmail.com

# docker build -t steam/rust:1.0 .

# Setup environment variables...
ENV STEAM_GAME 258550

RUN "$HOME/steamcmd.sh" +login anonymous +force_install_dir $GAME_DIR +app_update $STEAM_GAME validate +quit

# TODO Start the game server
