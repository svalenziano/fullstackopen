FRONTEND=../../02-com-with-server/phonebook/
echo "Deleting existing build files from backend"
\rm -rf ./dist
echo "Building frontend located at: $FRONTEND"
pushd $FRONTEND
npm run build
popd
cp -r "$FRONTEND/dist" ./dist
echo "Build complete"
