module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "plugins": [
    "react",
    "jsx-a11y",
    "import",
    "flowtype"
  ],
  "env": {
    "node": true,
    "browser": true,
    "mocha": true,
  },
  "rules": {
    "comma-dangle": 0,
    "arrow-body-style": [2, "as-needed"],
    "import/no-mutable-exports": 0,
    "import/no-extraneous-dependencies": 0,
    "no-console": 0,
    "object-shorthand": 0,
    "strict": 0,
    "new-cap": 0,
    "import/extensions": 0,
    "import/prefer-default-export": 0,
    "import/no-unresolved": 0 // This fixes a problem with Codeclimate https://github.com/codeclimate/codeclimate-eslint/issues/90
  },
  "globals": {
    "window": true
  }
};
