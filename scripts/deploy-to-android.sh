#!/usr/bin/env bash

CORDOVADIR=cordova-amiibot-amiibo-collector

echo "Building app to cordova...";
echo

echo "Running task runner build...";
echo

grunt build

echo
echo "Copying index.html...";
echo

cp -f index.html $CORDOVADIR/www/index.html

echo "Copying application directory...";
echo

rm -R $CORDOVADIR/www/app
cp -r app $CORDOVADIR/www/app

echo "Running android build...";
echo

cd $CORDOVADIR
cordova build android

echo "Installing and running application on emulator...";
echo

cordova run android
cd ..
