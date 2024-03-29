#!/usr/bin/env node
const { Command } = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const clipboardy = require('clipboardy');
const fetch = require('node-fetch');
const nfh = require('@jswork/node-fetch-html');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

updateNotifier({ pkg }).notify();

// next packages:
require('@jswork/next');
require('@jswork/next-absolute-package');

// http://idea.medeming.com/jets/
const { version } = nx.absolutePackage();
const program = new Command();

/**
 * pycharm: Python 面试官
 * webstorm: 前端领地
 * idea: 架构鱼
 * https://js.work/posts/a9701e51a674a
 *
 * 52shizhan:goland: Go语言圈/验证码
 */

const SECRETS = {
  'idea': ['https://www.ajihuo.com/idea/4222.html', 550905, 1],
  'pycharm': ['https://www.ajihuo.com/pycharm/4197.html', 550905, 1],
  'webstorm': ['https://www.ajihuo.com/webstorm/4188.html', 180822, 0],
  '52shizhan:goland': ['goland', 2209],
  '52shizhan:pycharm': ['pycharm', 4421],
  '52shizhan:webstorm': ['webstorm', 2588],
  '52shizhan:idea': ['webstorm', 2588]
};

const DEFAULT_OPTS = {
  method: 'post',
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
};

program.version(version);
program.parse(process.argv);

const App = nx.declare({
  methods: {
    async get(inTarget) {
      const secret = SECRETS[inTarget];
      const $ = await nfh(secret[0], {
        ...DEFAULT_OPTS,
        body: `secret_key=${secret[1]}`
      });
      const text = $('.secret-password blockquote').eq(secret[2]).text();
      clipboardy.writeSync(text);
    },

    async getSz(inTarget) {
      const secret = SECRETS[inTarget];
      const res = await fetch('http://web.52shizhan.cn/ide/getCode', {
        ...DEFAULT_OPTS,
        body: `code=${secret[1]}&read_count=&flag_title=${secret[0]}`
      }).then((r) => r.json());
      clipboardy.writeSync(res.data.ac_code);
    },

    async start() {
      const res = await inquirer.prompt([
        {
          name: 'type',
          type: 'list',
          message: 'Select your IDE',
          choices: Object.keys(SECRETS)
        }
      ]);
      const method = res.type.includes('52shizhan:') ? 'getSz' : 'get';
      await this[method](res.type);
      console.log(chalk.green('😎 Copyed'));
    }
  }
});

(async () => {
  const app = new App();
  await app.start();
})();
