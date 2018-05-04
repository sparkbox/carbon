const path = require('path');
const sass = require('node-sass');
const chalk = require('chalk');

module.exports = function compileSass(src, options = {}) {
  return new Promise((resolve, reject) => {
    sass.render(
      { file: path.resolve(src), ...options },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.css.toString());
      }
    );
  }).catch(logError);
};

function logError({ message, file, line, column }) {
  console.log(chalk.red(`[CSS ERROR] ${message}`));
  console.log(chalk.red(`at ${file} ${line}:${column}`));
}
