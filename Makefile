NODE=node
UJS=$(NODE) node_modules/uglify-js/bin/uglifyjs
LESS=$(NODE) node_modules/less/bin/lessc

OUT=out
PIX=src/pix
VERSION=`cat src/version`
MANIFEST_TEMPLATE=src/manifest.tmpl.json

all: zip
	@echo Done

zip: copy-resources minify-resources manifest
	@echo Zipping
	@cd $(OUT); zip habrauser -r *

minify-resources: minify-js minify-css

copy-resources: copy-pictures

copy-pictures: start
	@echo Copying pictures
	@cp -r $(PIX) $(OUT)/

minify-js: start
	@echo Minifying JS
	@mkdir $(OUT)/js
	$(UJS) -o $(OUT)/js/main.js src/js/main.js
	$(UJS) -o $(OUT)/js/loader.js src/js/loader.js

minify-css: start
	@echo Minifying CSS
	@mkdir $(OUT)/css
	@$(LESS) -x src/css/main.css > $(OUT)/css/main.css

manifest: start
	@echo Creating manifest
	@sed s/{{version}}/$(VERSION)/ $(MANIFEST_TEMPLATE) >> $(OUT)/manifest.json

start: clean
	@echo Make output dir
	@mkdir $(OUT)

clean:
	@echo Cleaning
	@rm -rf $(OUT)