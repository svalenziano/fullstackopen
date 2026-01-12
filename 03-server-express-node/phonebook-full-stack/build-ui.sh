#!/bin/bash
FRONTEND=../../02-com-with-server/phonebook/
echo "Deleting existing build files from backend"
\rm -rf ./dist
echo "Building frontend located at: $FRONTEND"
pushd $FRONTEND || exit 1
npm run build
popd || exit 1
cp -r "$FRONTEND/dist" ./dist
echo "Build complete"
