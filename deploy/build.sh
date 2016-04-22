$NODEMODULES = "/node_modules"

#rm -rf /node_modules


if [ ! -d "$NODEMODULES" ]; then
	npm install
fi

cd /node_modules/.bin
gulp
