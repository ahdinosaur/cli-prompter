const assign = require('../lib/assign')
const textPrompt = require('text-prompt')

module.exports = function Confirm ({ question, values }, cb) {
  const { name, message, default: dft } = question
  const display = `${message} (${dft ? 'Y/n' : 'y/N'})`
  return textPrompt(display)
    .once('submit', value => {
      if (!confirmed(value)) return Confirm({ question, values }, cb)
      if (name) values = assign(values, name, true)
      cb(null, values)
    })
    .once('error', cb)

  function confirmed (input) {
    var value = dft
    if (input != null && input !== '') {
      value = /^y(es)?/i.test(input)
    }
    return value
  }
}

