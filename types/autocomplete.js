const pify = require('lagden-promisify')
const autocompletePrompt = require('cli-autocomplete')

const assign = require('../lib/assign')
const normalizeOptions = require('../lib/normalizeOptions')

module.exports = function AutoComplete ({ question, values }, cb) {
  const { name, message, default: dft, suggest } = question
  const display = `${message} (${dft})`
  const suggester = Suggester({ suggest, values })
  return autocompletePrompt(display, suggester)
    .once('submit', value => {
      if (value === '') {
        if (dft) value = dft
        else return AutoComplete({ question, values }, cb) // retry
      }
      const nextValues = assign(values, name, value)
      cb(null, nextValues)
    })
    .once('error', cb)
}

function Suggester ({ suggest, values }) {
  return pify(function (input, cb) {
    return suggest({ input, values }, (err, suggestions) => {
      if (err) cb(err)
      else cb(null, normalizeOptions(suggestions))
    })
  })
}
