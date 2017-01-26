#!/bin/bash

# As the Steam user...

# variables
export INSTALL_DIR=/home/steam/css_server
export STEAMCMD_DIR=/home/steam/steamcmd
export SERVER_CFG_URL=https://raw.githubusercontent.com/nickgrealy/aws-projects/master/steam/css-server/config/server.cfg
export STEAMCMD_TAR_URL=https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz
export STEAM_SDK32_DIR=/home/steam/.steam/sdk32
export CFG_DIR="$INSTALL_DIR/cstrike/cfg"

mkdir "$STEAMCMD_DIR" && cd "$STEAMCMD_DIR"
curl -sqL "$STEAMCMD_TAR_URL" | tar zxvf -

# Install CSS Server...
"$STEAMCMD_DIR/steamcmd.sh" +login anonymous +force_install_dir "$INSTALL_DIR" +app_update 232330 validate +quit

# Replace GAME_SERVER_PASSWORD in server.cfg file...
curl $SERVER_CFG_URL -o "$CFG_DIR/server.cfg"
sed -i s/GAME_SERVER_PASSWORD/$GAME_SERVER_PASSWORD/g "$CFG_DIR/server.cfg"

# Randomize map file
shuf "$CFG_DIR/mapcycle_default.txt" --output="$CFG_DIR/mapcycle.txt"

# Hack to fix missing .so file...
mkdir -p "$STEAM_SDK32_DIR"
ln -s "$INSTALL_DIR/bin/steamclient.so" "$STEAM_SDK32_DIR/steamclient.so"

# Notify server starting...
EXT_SERVER_NAME="$(curl -s http://169.254.169.254/latest/meta-data/public-hostname)"
curl -X POST --data-urlencode "payload={\"channel\": \"#counterstrikesource\", \"username\": \"aws-server\", \"text\": \"A new server is starting up... server: `$EXT_SERVER_NAME:27015` - password: `$GAME_SERVER_PASSWORD`\", \"icon_emoji\": \":ghost:\"}" https://hooks.slack.com/services/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

# Start CSS Server...
"$INSTALL_DIR/srcds_run" -console -game cstrike +map de_dust -maxplayers 16
