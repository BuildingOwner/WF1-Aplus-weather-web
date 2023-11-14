const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    ['timers']: path.resolve(__dirname, 'node_modules/timers-browserify'),
    ['stream']: path.resolve(__dirname, 'node_modules/stream-browserify')
  })
);