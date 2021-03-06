#!/usr/bin/env node
const { Command } = require('commander');
const chalk = require('chalk');

// next packages:
require('@jswork/next');
require('@jswork/next-absolute-package');
require('@jswork/next-node-downfile');

const { version } = nx.absolutePackage();
const program = new Command();
const execSync = require('child_process').execSync;
const TMP_DIR = '/tmp/idea-crack';
const ZIP_DIR = 'http://soft-hub.cn/article/ll2d7f50fa62eb45f0171c5321f9fc926f.zip';

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
            "cat '2018.2之后的版本用这个.txt' | pbcopy"
          ].join('&&')
        );
        console.log(chalk.green('😎 Copyed!'));
      });
    }
  }
});
