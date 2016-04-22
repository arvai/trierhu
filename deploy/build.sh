$BASE = "/var/www/trier.hu/public_html"
$NODEMODULES = "$BASE/node_modules"

#rm -rf $NODEMODULES

cd $BASE

if [ ! -d "$NODEMODULES" ]; then
	npm install
fi

cd $NODEMODULES/.bin

gulp
