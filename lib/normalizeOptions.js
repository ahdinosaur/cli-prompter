const is = require('typeof-is')

module.exports = function (options) {
  return options.map(option => {
    if (is.object(option) && option.title && option.value) return option
    else if (is.string(option)) return { title: option, value: option }
    else throw new Error('cli-prompter: not sure how to normalize these options')
  })
}
