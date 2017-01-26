#!/bin/bash

# As the Steam user...

# variables
export INSTALL_DIR=/home/steam/css_server
export STEAMCMD_DIR=/home/steam/steamcmd
export SERVER_CFG_URL=https://raw.githubusercontent.com/nickgrealy/aws-projects/master/steam/css-server/config/server.cfg
export STEAMCMD_TAR_URL=https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz
export STEAM_SDK32_DIR=/home/steam/.steam/sdk32
export CFG_DIR="$INSTALL_DIR/cstrike/cfg"
export MSG_SERVER="$(echo aHR0cHM6Ly9ob29rcy5zbGFjay5jb20vc2VydmljZXMvVDNWRzhIRTJEL0IzVzk0QzdCNi9CUUNydjlUeXlLOGFxOWRDM3dQZFBXWVo= | base64 --decode)"

mkdir "$STEAMCMD_DIR" && cd "$STEAMCMD_DIR"
curl -sqL "$STEAMCMD_TAR_URL" | tar zxvf -

# Install CSS Server...
curl -X POST --data-urlencode "payload={\"channel\": \"#counterstrikesource\", \"username\": \"aws-server\", \"text\": \"*Step 1/2* - Installing server...\", \"icon_emoji\": \":white_check_mark:\"}" $MSG_SERVER
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
curl -X POST --data-urlencode "payload={\"channel\": \"#counterstrikesource\", \"username\": \"aws-server\", \"text\": \"*Step 2/2* - Starting server... \n*Server:* \`$EXT_SERVER_NAME:27015\` \n*Password:* \`$GAME_SERVER_PASSWORD\`\", \"icon_emoji\": \":white_check_mark:\"}" $MSG_SERVER

# Start CSS Server...
"$INSTALL_DIR/srcds_run" -console -game cstrike +map de_dust -maxplayers 16

# TODO Make MSG_SERVER a parameter?
# TODO Automatically DELETE Cloud after 24 hours?
