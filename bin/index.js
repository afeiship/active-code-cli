#!/usr/bin/env node
const { Command } = require('commander');
const chalk = require('chalk');

// next packages:
require('@jswork/next');
require('@jswork/next-absolute-package');
require('@jswork/next-node-downfile');

// http://idea.medeming.com/jets/
const { version } = nx.absolutePackage();
const program = new Command();
const execSync = require('child_process').execSync;
const TMP_DIR = '/tmp/idea-crack';
// backup urls:
// http://ajihuo.com/a/jihuoma.zip
// http://idea.medeming.com/a/jihuoma.zip
// http://idea.medeming.com/jets/images/jihuoma.zip
const ZIP_DIR = `http://idea.medeming.com/a/jihuoma.zip?ts=${Date.now()}`;

program.version(version);
program.parse(process.argv);

nx.declare({
  statics: {
    init() {
      const app = new this();
      app.start();
    }
  },
  methods: {
    init() {},
    start() {
      execSync([`rm -rf ${TMP_DIR}`, `mkdir -p ${TMP_DIR}`].join('&&'));
      nx.nodeDownfile({ url: ZIP_DIR, filename: `${TMP_DIR}/active-code.zip` }).then(() => {
        execSync(
          [
            `cd ${TMP_DIR}/`,
            '7z e active-code.zip',
            "cat '(通用激活码)2018.2之后的版本用这个.txt' | pbcopy"
          ].join('&&')
        );
        console.log(chalk.green('😎 Copyed!'));
      });
    }
  }
});
