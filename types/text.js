const assign = require('../lib/assign')
const textPrompt = require('text-prompt')

module.exports = function Text ({ question, values }, cb) {
  const { name, message, default: dft, allowNull } = question
  const display = `${message} (${dft})`
  return textPrompt(display)
    .once('submit', value => {
      if (value === '' && allowNull !== true) {
        if (dft) value = dft
        else return Text({ question, values }, cb) // retry
      }
      const nextValues = assign(values, name, value)
      cb(null, nextValues)
    })
    .once('error', cb)
}
