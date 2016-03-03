gulp clean
gulp zip
gulp buildrelease
gulp manifest
rm -rf output
mkdir -p webroot/static/car/m
mkdir -p conf/app/car
mkdir output

cp -r ./dist/* ./webroot/static/car/m/
cp ./client.conf ./conf/app/car/client.conf
tar -cvzf ./car.tar.gz webroot conf
rm -rf webroot
rm -rf conf

mv car.tar.gz output
