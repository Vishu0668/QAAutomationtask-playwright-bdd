const path = require('path');
const { spawn } = require('child_process');

const allureBin = path.resolve(__dirname, '../node_modules/allure-commandline/bin/allure');

const args = ['open', path.resolve(__dirname, '../allure-report')];

const child = spawn(process.execPath, [allureBin, ...args], { stdio: 'inherit', shell: false });
child.on('exit', code => process.exit(code));
