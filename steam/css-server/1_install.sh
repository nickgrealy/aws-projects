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
wget https://raw.githubusercontent.com/nickgrealy/aws-projects/master/steam/css-server/2_server.sh -P /tmp
chmod 777 /tmp/2_server.sh
sudo su - steam -c 'export SERVER_PASSWORD=test123; /tmp/2_server.sh' &

# TODO Externally configure SERVER_PASSWORD
