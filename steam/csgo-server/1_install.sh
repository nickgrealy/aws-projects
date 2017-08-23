#!/bin/bash
#
# https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Dedicated_Servers
#
# N.B. Requires 20GB Disk Space
#
# To get a game key: http://steamcommunity.com/dev/managegameservers -> 730
#

# setup
sudo yum install glibc.i686 libstdc++.i686 ncurses-libs.i686 -y
sudo useradd -m steam
sudo chown steam:steam /home/steam
sudo su steam
export GAME_KEY=XXXXXXXXXXXXX
export STEAMCMD_TAR_URL=https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz
export STEAMCMD_DIR=/home/steam/steamcmd
export INSTALL_DIR=/home/steam/server
export STEAM_SDK32_DIR=/home/steam/.steam/sdk32
mkdir -p "$STEAM_SDK32_DIR" && ln -s "$INSTALL_DIR/bin/steamclient.so" "$STEAM_SDK32_DIR/steamclient.so"
mkdir "$STEAMCMD_DIR" && cd "$STEAMCMD_DIR"
curl -sqL ""$STEAMCMD_TAR_URL"" | tar zxvf -

# install
"$STEAMCMD_DIR/steamcmd.sh" +login anonymous +force_install_dir "$INSTALL_DIR" +app_update 740 validate +quit
# todo setup config files
"$INSTALL_DIR/srcds_run" -game csgo -console -usercon +game_type 0 +game_mode 0 +mapgroup mg_active +map de_dust2 +sv_setsteamaccount "$GAME_KEY"
