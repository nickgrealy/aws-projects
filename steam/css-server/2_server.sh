# As the Steam user...

# variables
export install_dir=/home/steam/css_server
export steamcmd_home=/home/steam/steamcmd
export server_cfg=https://raw.githubusercontent.com/nickgrealy/aws-projects/master/steam/css-server/config/server.cfg
export steamcmd_tar=https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz
export steam_sdk32=/home/steam/.steam/sdk32
export cfg_file="$install_dir/cstrike/cfg/server.cfg"

# aliases
alias inst='cd $install_dir'
alias cfg='cd $install_dir/cstrike/cfg'
alias steam='cd $steamcmd_home'

mkdir "$steamcmd_home" && cd "$steamcmd_home"
curl -sqL "$steamcmd_tar" | tar zxvf -

# Install CSS Server...
"$steamcmd_home/steamcmd.sh" +login anonymous +force_install_dir "$install_dir" +app_update 232330 validate +quit

# Replace SERVER_PASSWORD in server.cfg file...
curl $server_cfg -o "$cfg_file"
sed -i s/SERVER_PASSWORD/$SERVER_PASSWORD/g "$cfg_file"
cat "$cfg_file"

# Hack to fix missing .so file...
mkdir -p "$steam_sdk32"
ln -s "$install_dir/bin/steamclient.so" "$steam_sdk32/steamclient.so"

# TODO: Notify server starting...

# Start CSS Server...
"$install_dir/srcds_run" -console -game cstrike +map de_dust -maxplayers 16
