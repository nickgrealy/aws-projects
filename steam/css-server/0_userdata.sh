wget ...
wget ...
chmod 777 *.sh
cp *.sh /tmp
sudo /tmp/1_server.sh
sudo chown steam:steam /home/steam

# TODO Externally configure SERVER_PASSWORD

sudo su - steam -c 'export SERVER_PASSWORD=test123; /tmp/2_server.sh' &