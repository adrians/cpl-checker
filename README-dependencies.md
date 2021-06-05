The project needs the following dependencies built locally:

* The custom antlr4 jar that generates browser-friendly JS code:
```bash
cd antlr4
mvn package
cp tool/target/antlr4-4.9.2-complete.jar ..
```

* The javascript runtime (a library needed inside the browser in order to run the generated code):
```bash
cd antlr4/runtime/JavaScript/src
webpack-cli --config ./webpack.config.js
cp dist/antlr4.js ../../../../dist/
```

If you don't have the `webpack-cli` tool, you can install it with `npm install -g webpack-cli`.
Tested with webpack 5.17.0 and webpack-cli 4.4.0.

* The monaco bundle:

```bash
git clone https://github.com/Microsoft/monaco-editor-samples.git
cd monaco-editor-samples/
git apply ../cpl-check/0001-test.patch
npm install
cd browser-esm-webpack-small/
npm run-script build
cp dist/app.bundle.js ../cpl-check/dist/app.bundle.js
```
