module.exports = {
  extends: 'sparkbox',
  overrides: [
    {
      files: ['**/*test.js', '**/*spec.js'],
      // env options will allow all of the global variable names
      // for specific authoring environments, such as testing frameworks
      // add your testing environment here
      env: {
        mocha: true
        // jasmine: true,
        // jest: true,
      },
      rules: {
        'no-unused-expressions': 'off'
      }
    }
  ]
};
