npm run build
TAR_FILE=`npm pack -s`
echo $TAR_FILE
scp $TAR_FILE euglat1@william-paca.dreamhost.com:~/
ssh euglat1@william-paca.dreamhost.com "rm -rf package && tar -zxf $TAR_FILE && mv package/dist/* workaround.com.ar/"
