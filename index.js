const waterfall = require('run-waterfall')

module.exports = cliPrompter

const promptTypes = require('./types')

function cliPrompter (questions, cb) {
  waterfall([
    cb => cb(null, {}), // start the waterfall with values
    ...questions.map(promptQuestion)
  ], cb)
}

function promptQuestion (question) {
  const { type } = question
  const Prompter = promptTypes[type]
  return (values, cb) => {
    Prompter({ question, values }, cb)
  }
}

