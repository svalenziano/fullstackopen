FRONTEND=../../02-com-with-server/phonebook/
echo "Deleting existing build files from backend"
\rm -rf ./dist
echo "Building frontend located at: $FRONTEND"
cd $FRONTEND || exit 1
npm run build
cd - || exit 1
cp -r "$FRONTEND/dist" ./dist
echo "Build complete"
