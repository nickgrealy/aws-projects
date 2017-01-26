#!/bin/bash

# As the sudo user...

# cleanup used space (optional)
sudo yum -y remove mysql-server mysql java aws-apitools-common aws-amitools-ec2 aws-cfn-bootstrapl
sudo yum update -y
sudo yum install glibc.i686 libstdc++.i686 ncurses-libs.i686 -y
sudo rm -Rf /var/cache/yum/x86_64/latest

# setup steam...
sudo useradd -m steam
sudo chown steam:steam /home/steam
curl https://raw.githubusercontent.com/nickgrealy/aws-projects/master/steam/css-server/2_server.sh -o /tmp/2_server.sh
chmod 777 /tmp/2_server.sh
sudo su - steam -c "export GAME_SERVER_PASSWORD=$GAME_SERVER_PASSWORD; /tmp/2_server.sh" &
