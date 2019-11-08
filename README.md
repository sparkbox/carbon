# carbon
Core elements of Sparkbox projects. This repo is intended to be used as either a template for new webpack projects or as a resource for common build configuration files.

## Browserslist
The `.browserslistrc` file is a list of browsers that front-end tools will target. Currently, the Carbon tools using `.browserslistrc` are:
* Autoprefixer
* Babel

You can test your Browserslist query configurations via [this tool](http://browserl.ist/), or by running `npx browserslist` in the root of your project.

## Linting
We have configuration files for [ESLint][eslint] and [stylelint][stylelint]. Both of these tools use standard configurations published by Sparkbox. Those can be installed as [eslint-config-sparkbox][eslintSB] and [@sparkbox/stylelint-config-sparkbox][stylelintSB].

## Webpack
The `webpack.config.js` file is set up to handle the majority of scenarios we typically need for front-end builds. You can use this as a jumping off point and remove or add configurations as needed. Here's an overview of what's included:

### Dev Server
`npm start` will run [`webpack-dev-server`][wds] to watch, rebuild, and reload during development. If you use a different server for local development, then you can remove the `devServer` configuration all together.

### Static Assets
Assets such as fonts and images will be copied recursively from `src/assets` to `dist/`. These files will be watched and re-copied during development.

### HTML
This configuration uses the [`HtmlWebpackPlugin`][htmlPlugin] to generate an `index.html` file and automatically inject the built CSS and JS files. If your project uses a separate templating or server rendering approach, then you will want to remove the HTML plugin and associated extension plugins ([`ScriptExtHtmlWebpackPlugin`][htmlScriptPlugin] and [`HtmlWebpackExcludeAssetsPlugin`][htmlExcludePlugin]). For details on loading assets in your project, see [asset manifest](#asset-manifest) below.

### CSS
Webpack handles the CSS pipeline. It includes `node-sass` and `postcss`. Postcss will respect the `postcss.config.js` file. Autoprefixer is the only plugin installed by default. Postcss will respect [`.browserslistrc`](#browserslist). Source maps will be generated when running in development.

### JS
JavaScript will be compiled with [`babel`][babel], using [`@babel/preset-env`][presetEnv]. This preset will respect [`.browserslistrc`](#browserslist) and apply the necessary code transformations to support your target platforms.

Webpack is configured to add support for environment variables that can be accessed in your source code. This can be useful for injecting different values when building local vs production, or to run certain code only in development.

### Asset Manifest
Webpack will generate an asset manifest using [`WebpackManifestPlugin`][manifestPlugin]. This can be used to read asset paths for CSS and JS. For production builds, it will include content-based hashing fingerprints. By default, the manifest is written in JSON, but the output format can be customized if needed. The manifest object is a set of key value pairs. The keys are the names of input files such as `styles.css`, and the values are the paths to the corresponding assets. Images are also included in the manifest.

### Polyfills
The example setup in this repo uses a dynamic polyfill loading strategy. Different projects may chose different methods of loading polyfills to support their target platforms. 

### Build Stats
There is a task to run the production build and inspect the bundle details. Webpack will generate a static page using [`BundleAnalyzerPlugin`][analyzerPlugin]. Run `npm run build:stats` and navigate to http://localhost:3000/bundle-report.html.

<!-- links -->
[eslint]: https://github.com/eslint/eslint
[eslintSB]: https://github.com/sparkbox/eslint-config-sparkbox
[stylelint]: https://github.com/stylelint/stylelint
[stylelintSB]: https://github.com/sparkbox/stylelint-config-sparkbox
[wds]: https://github.com/webpack/webpack-dev-server
[htmlPlugin]: https://github.com/jantimon/html-webpack-plugin
[htmlScriptPlugin]: https://github.com/numical/script-ext-html-webpack-plugin
[htmlExcludePlugin]: https://github.com/jamesjieye/html-webpack-exclude-assets-plugin
[nodeSass]: https://github.com/sass/node-sass
[postcss]: https://github.com/postcss/postcss
[babel]: https://babeljs.io/
[presetEnv]: https://babeljs.io/docs/en/babel-preset-env
[manifestPlugin]: https://www.npmjs.com/package/webpack-manifest-plugin
[analyzerPlugin]: https://www.npmjs.com/package/webpack-bundle-analyzer
