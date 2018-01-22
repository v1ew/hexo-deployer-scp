/* global hexo */
'use strict';

hexo.extend.deployer.register('scp', require('./lib/deployer'));
