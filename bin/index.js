#!/usr/bin/env node
const { Command } = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const clipboardy = require('clipboardy');
const nfh = require('@jswork/node-fetch-html');

// next packages:
require('@jswork/next');
require('@jswork/next-absolute-package');

// http://idea.medeming.com/jets/
const { version } = nx.absolutePackage();
const program = new Command();

const SECRETS = {
  idea: ['https://idea.medeming.com/jetbrains/1119.html', 220529],
  pycharm: ['https://idea.medeming.com/pycharm/1045.html', 550620]
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
      const text = $('.secret-password blockquote').eq(1).text();
      clipboardy.writeSync(text);
    },
    async start() {
      const res = await inquirer.prompt([
        {
          name: 'type',
          type: 'list',
          message: 'Select your IDE',
          choices: [{ value: 'idea' }, { value: 'pycharm' }]
        }
      ]);

      await this.get(res.type);
      console.log(chalk.green('😎 Copyed!'));
    }
  }
});

(async () => {
  const app = new App();
  await app.start();
})();
