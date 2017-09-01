#!/bin/bash
#
# https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Dedicated_Servers
#
# N.B. Requires 20GB Disk Space
#
# To get a game key: http://steamcommunity.com/dev/managegameservers -> 730
#

# setup env
export STEAMCMD_TAR_URL=https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz
export STEAMCMD_DIR=~/steamcmd
export INSTALL_DIR=~/server
export STEAM_SDK32_DIR=~/.steam/sdk32
export GAME_DIR="$INSTALL_DIR/csgo"
export CFG_DIR="$INSTALL_DIR/csgo/cfg"
export MSG_SERVER="$(echo aHR0cHM6Ly9ob29rcy5zbGFjay5jb20vc2VydmljZXMvVDNWRzhIRTJEL0IzVzk0QzdCNi9CUUNydjlUeXlLOGFxOWRDM3dQZFBXWVo= | base64 --decode)"

curl -X POST --data-urlencode "payload={\"channel\": \"#csgo\", \"username\": \"aws-server\", \"text\": \"*Step 1/2* - Installing server...\", \"icon_emoji\": \":white_check_mark:\"}" $MSG_SERVER

# pre-install
sudo yum install glibc.i686 libstdc++.i686 ncurses-libs.i686 -y
mkdir -p "$STEAM_SDK32_DIR" && ln -s "$INSTALL_DIR/bin/steamclient.so" "$STEAM_SDK32_DIR/steamclient.so"
mkdir "$STEAMCMD_DIR" && cd "$STEAMCMD_DIR"
curl -sqL ""$STEAMCMD_TAR_URL"" | tar zxvf -

# install
"$STEAMCMD_DIR/steamcmd.sh" +login anonymous +force_install_dir "$INSTALL_DIR" +app_update 740 validate +quit

# configure
curl https://raw.githubusercontent.com/nickgrealy/aws-projects/master/steam/csgo-server/classic/gamemodes_server.txt -o "$GAME_DIR/gamemodes_server.txt"
curl https://raw.githubusercontent.com/nickgrealy/aws-projects/master/steam/csgo-server/classic/autoexec.cfg -o "$CFG_DIR/autoexec.cfg"
curl https://raw.githubusercontent.com/nickgrealy/aws-projects/master/steam/csgo-server/classic/server.cfg -o "$CFG_DIR/server.cfg"
sed -i s/GAME_SERVER_PASSWORD/$GAME_SERVER_PASSWORD/g "$CFG_DIR/autoexec.cfg"

curl -X POST --data-urlencode "payload={\"channel\": \"#csgo\", \"username\": \"aws-server\", \"text\": \"*Step 2/2* - Starting server... \n*Server:* \`$EXT_SERVER_NAME:27015\` \n*Password:* \`$GAME_SERVER_PASSWORD\`\", \"icon_emoji\": \":white_check_mark:\"}" $MSG_SERVER

# start
"$INSTALL_DIR/srcds_run" -game csgo -console -usercon +game_type 0 +game_mode 0 +mapgroup mg_active +map de_dust2 +sv_setsteamaccount "$STEAM_GAME_KEY"
