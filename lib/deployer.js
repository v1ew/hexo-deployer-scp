'use strict';

var chalk = require('chalk');
var spawn = require('hexo-util/lib/spawn');
var pathFn = require('path');

module.exports = function(args) {
  if (!args.host || !args.user || !args.root) {
    var help = '';

    help += 'You should configure deployment settings in _config.yml first!\n\n';
    help += 'Example:\n';
    help += '  deploy:\n';
    help += '    type: scp\n';
    help += '    host: <host>\n';
    help += '    user: <user>\n';
    help += '    root: <root>\n';
    help += '    port: [port] # Default is 22\n';
    help += '    args: <scp args>\n';
    help += '    verbose: [true|false] # Default is true\n';
    help += 'For more help, you can check the docs: ' + chalk.underline('http://hexo.io/docs/deployment.html');

    console.log(help);
    return;
  }

  if (!args.hasOwnProperty('verbose')) args.verbose = true;

  var params = [
    '-rC',
    process.platform === 'win32' ? pathFn.basename(this.public_dir) + '/' : this.public_dir,
    args.user + '@' + args.host + ':' + args.root
  ];

  if (args.port && args.port > 0 && args.port < 65536) {
    params.splice(params.length - 2, 0, '-P ' + args.port);
  }

  if (args.verbose) params.unshift('-v');
  if (args.args) params.unshift(args.args);

  return spawn('scp', params, {verbose: true});
};
