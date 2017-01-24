# As the sudo user...

# cleanup used space (optional)
sudo yum -y remove mysql-server mysql java aws-apitools-common aws-amitools-ec2 aws-cfn-bootstrapl
sudo yum update -y
sudo yum install glibc.i686 libstdc++.i686 ncurses-libs.i686 -y
sudo rm -Rf /var/cache/yum/x86_64/latest

# setup steam user
sudo useradd -m steam
#sudo -iu steam

# TODO execute 2_server.sh