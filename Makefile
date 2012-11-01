NODE=node
UJS=$(NODE) node_modules/uglify-js/bin/uglifyjs
LESS=$(NODE) node_modules/less/bin/lessc

OUT=out
PIX=src/pix
HTML=src/html
VERSION=`cat src/version`
MANIFEST_TEMPLATE=src/manifest.json

all: zip
	@echo Done

zip: copy-resources minify-resources manifest
	@echo Zipping
	@cd $(OUT); zip habrauser -r *

minify-resources: minify-js minify-css

copy-resources: copy-pictures copy-html

copy-pictures: start
	@echo Copying pictures
	@cp -r $(PIX) $(OUT)/

copy-html: start
	@echo Copying html
	@cp -r $(HTML) $(OUT)/

minify-js: start
	@echo Minifying JS
	@mkdir $(OUT)/js
	@$(UJS) -o $(OUT)/js/main.js src/js/main.js
	@$(UJS) -o $(OUT)/js/loader.js src/js/loader.js
	@$(UJS) -o $(OUT)/js/loader.js src/js/background.js
	@$(UJS) -o $(OUT)/js/loader.js src/js/options.js

minify-css: start
	@echo Minifying CSS
	@mkdir $(OUT)/css
	@$(LESS) -x src/css/main.css > $(OUT)/css/main.css

manifest: start
	@echo Creating manifest
	@sed s/0\.0\.0\.0/$(VERSION)/ $(MANIFEST_TEMPLATE) >> $(OUT)/manifest.json

start: clean
	@echo Make output dir
	@mkdir $(OUT)

clean:
	@echo Cleaning
	@rm -rf $(OUT)