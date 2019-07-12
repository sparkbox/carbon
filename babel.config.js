module.exports = function(api) {
  api.cache.forever();

  const presets = [
    [
      // preset-env will read from .browserslistrc to add the necessary transforms
      // !! make sure you update .browserslistrc to suite your project !!
      '@babel/preset-env',
      {
        // this option gives control to webpack (or rollup)
        // to exclusivley handle parsing/resolving of imports
        modules: false
      }
    ]
  ];

  const plugins = ['@babel/plugin-syntax-dynamic-import'];

  return { presets, plugins };
}
