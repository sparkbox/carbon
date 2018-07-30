module.exports = {
  "extends": "stylelint-config-sparkbox",
  "plugins": [
    "stylelint-scss"
  ],
  "env": {
    "node": true,
    "browser": true
  },
  "rules": {
    "max-empty-lines": [2, { ignore: ["comments"] }],
    "max-nesting-depth": 4,
    "number-no-trailing-zeros": true,
    "number-leading-zero": "always",
    "no-empty-source": null,
    "color-hex-case": "upper",
    "color-hex-length": "long",
    "block-closing-brace-newline-after": null,
    "declaration-empty-line-before": null,
    "declaration-colon-newline-after": "always-multi-line",
    "selector-list-comma-newline-after": "always-multi-line",
    "at-rule-no-unknown": null,
    "function-linear-gradient-no-nonstandard-direction": null,
    "no-eol-whitespace": null
  }
}
