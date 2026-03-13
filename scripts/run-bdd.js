const { spawn } = require('child_process');
const path = require('path');

const cucumberBin = path.resolve(__dirname, '../node_modules/@cucumber/cucumber/bin/cucumber.js');
const formatOptions = JSON.stringify({ resultsDir: 'allure-results' });

// Support --profile flag e.g. node scripts/run-bdd.js --profile smoke
const args = process.argv.slice(2); // e.g. ['--profile', 'smoke']

const spawnArgs = [
  cucumberBin,
  ...args,
  '--format', 'progress',
  '--format', 'allure-cucumberjs/reporter',
  '--format-options', formatOptions
];

const child = spawn(process.execPath, spawnArgs, { stdio: 'inherit', shell: false });
child.on('exit', code => process.exit(code));
