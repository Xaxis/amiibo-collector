#!/usr/bin/env bash

APPNAME=amiibot-amiibo-collector
CORDOVADIR=cordova-$APPNAME

# Prompt for release version
echo "What is the version of the release to prepare?"
read VERSION

# Create release directory when not existent
if [ ! -d "releases/$VERSION" ]; then
  echo
  echo "Creating $VERSION release directory..."
  mkdir releases/$VERSION

# Otherwise remove previous release build
else
  if [ -d "releases/$VERSION/$APPNAME.apk" ]; then
    echo
    echo "Removing previous release build version $VERSION."
    rm releases/$VERSION/$APPNAME.apk
    rm releases/$VERSION/$APPNAME-unsigned.apk
  fi
fi

# Build the release file
cd $CORDOVADIR
cordova build --release android
cd ..

# Move the release file into releases version directory
echo "Copying unsigned build to release version $VERSION directory..."
cp $CORDOVADIR/platforms/android/build/outputs/apk/android-release-unsigned.apk releases/$VERSION/$APPNAME-unsigned.apk

# Create keystore file when non existent
if [ ! -d "releases/$APPNAME.keystore" ]; then
  echo
  echo "Generating $APPNAME $VERSION build key..."
  cd releases
  keytool -genkey -v -keystore $APPNAME.keystore -alias $APPNAME -keyalg RSA -keysize 2048 -validity 10000
  cd ..
fi

# Sign unsigned build
echo
echo "Signing build with previously $APPNAME.keystore..."
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore releases/$APPNAME.keystore releases/$VERSION/$APPNAME-unsigned.apk $APPNAME

# Optimize the signed build
echo
echo "Optimizing build..."
zipalign -v 4 releases/$VERSION/$APPNAME-unsigned.apk releases/$VERSION/$APPNAME.apk

echo
echo "$APPNAME version $VERSION has been signed and optimized. Build is complete and ready to upload."
