const test = require('tape')

const cliPrompter = require('../')

test('cli-prompter', function (t) {
  t.ok(cliPrompter, 'module is require-able')
  t.end()
})
