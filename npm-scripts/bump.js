#!/usr/bin/env node

var fs = require('fs');

var args = process.argv.slice(2);

var ver = args[0];

if (!ver) {
  console.log('Usage: npm run bump 4.2.1');
  return -1;
}

var CHANGELOG = './CHANGELOG.md';
var PACKAGE = './package.json';

var data;

// CHANGELOG.md
data = fs.readFileSync(CHANGELOG, 'utf-8');
data = data.replace('# Changelog', '# Changelog \n\n## ' + ver + '\n*');
fs.writeFileSync(CHANGELOG, data, 'utf-8');

// package.json
data = fs.readFileSync(PACKAGE, 'utf-8');
data = data.replace(/\"version\".*/, '"version": "' + ver + '",');
fs.writeFileSync(PACKAGE, data, 'utf-8');

console.log('bumped merlin-feedback to ' + ver);
