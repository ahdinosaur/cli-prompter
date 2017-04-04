const waterfall = require('run-waterfall')
const pullAsyncMap = require('pull-stream/throughs/async-map')

module.exports = cliPrompter

const promptTypes = require('./types')

function cliPrompter (questions, cb) {
  if (arguments.length === 0) {
    return pullAyncScan({}, (values, question, cb) => {
      const prompter = getPrompter(question)
      prompter({ question, values }, cb)
    })
  }

  waterfall([
    cb => cb(null, {}), // start the waterfall with values
    ...questions.map(question => {
      const prompter = getPrompter(question)
      return (values, cb) => {
        prompter({ question, values }, cb)
      }
    })
  ], cb)
}

function getPrompter ({ type }) {
  return promptTypes[type]
}

function pullAyncScan (value, accumulator) {		
  return pullAsyncMap((next, cb) => {
    accumulator(value, next, (err, nextValue) => {
      if (err) return cb(err)
      value = nextValue
      cb(null, value)
    })
  })		
}
