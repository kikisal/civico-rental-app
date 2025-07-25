#!/bin/bash

start_time=$(date +%s)
echo "Deploying Movin' In admin..."

cd /opt/movinin
git pull
sudo chmod +x -R /opt/movinin/__scripts

/bin/bash /opt/movinin/__scripts/free-mem.sh

cd /opt/movinin/admin
sudo rm -rf build

npm install --force
npm run build

sudo rm -rf /var/www/movinin/admin
sudo mkdir -p /var/www/movinin/admin
sudo cp -rf build/* /var/www/movinin/admin

sudo rm -rf /var/cache/nginx
sudo systemctl restart nginx
sudo systemctl status nginx --no-pager

/bin/bash /opt/movinin/__scripts/free-mem.sh

finish_time=$(date +%s)
elapsed_time=$((finish_time - start_time))
((sec=elapsed_time%60, elapsed_time/=60, min=elapsed_time%60))
timestamp=$(printf "Movin' In admin deployed in %d minutes and %d seconds." $min $sec)
echo "$timestamp"

#$SHELL
