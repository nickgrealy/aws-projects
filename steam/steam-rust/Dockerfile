
FROM steam/base:16.04
MAINTAINER nickgrealy@gmail.com

# docker build -t steam/rust:1.0 .

# Setup environment variables...
ENV GAME_DIR /home/steam/GAME_DIR
ENV STEAM_GAME 258550
ENV SERVER_PASSWORD letmein

RUN df -h

RUN mkdir -p $GAME_DIR && $STEAMCMD +@sSteamCmdForcePlatformType linux +login anonymous +force_install_dir $GAME_DIR +app_update $STEAM_GAME validate +quit

EXPOSE 28015/tcp
EXPOSE 28015/udp
EXPOSE 28016/tcp

# ENV LD_LIBRARY_PATH=${GAME_DIR}:${GAME_DIR}/RustDedicated_Data:${GAME_DIR}/RustDedicated_Data/Plugins/x86_64:{$LD_LIBRARY_PATH}

# 172.17.0.2

# client.connect localhost:28015

# client.connect 127.0.0.1:28015
# client.connect 172.17.0.2:28015

RUN apt-get update --no-install-recommends --assume-yes

RUN apt-get install --no-install-recommends --assume-yes net-tools

# RUN find / -iname libsqlite3.so*
# RUN ls -la /home/steam/GAME_DIR/RustDedicated_Data/MonoBleedingEdge

# Required! - https://rust.facepunch.com/f/rust/eehy/Linux-RustDedicated-Couldn-t-load-root-AssetBundle/1/#postnnvv
WORKDIR $GAME_DIR

# ENV LD_LIBRARY_PATH=${GAME_DIR}:${GAME_DIR}/RustDedicated_Data:${GAME_DIR}/RustDedicated_Data/Plugins/x86_64:{$LD_LIBRARY_PATH}

# CMD "$HOME/steamcmd.sh" +@sSteamCmdForcePlatformType linux +login anonymous +force_install_dir $GAME_DIR +app_update $STEAM_GAME validate +quit \

# CMD $GAME_DIR/RustDedicated -batchmode -load -nographics +nav_disable 1 +net.visdebug 1 +server.secure 1 +server.eac 1 +server.identity docker +server.ip 0.0.0.0 +server.port 28015 +server.seed 1234 +server.worldsize 1000 +server.hostname Rust +rcon.port 28016 +rcon.password ${SERVER_PASSWORD}} -logfile /dev/stdout

CMD $GAME_DIR/RustDedicated -batchmode -load -nographics +server.seed 1234 +server.worldsize 1000 +server.hostname Rust +rcon.port 28016 +rcon.password ${SERVER_PASSWORD}} -logfile /dev/stdout
