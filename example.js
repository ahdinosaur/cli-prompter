const prompter = require('./')
const range = require('array-range')
const randomWord = require('random-word')
const licenses = require('spdx-license-list/simple')
const getUserName = require('username').sync

const questions = [{
  type: 'text',
  name: 'name',
  message: 'Give your app a name',
  default: range(2).map(randomWord).join('-')
}, {
  type: 'text',
  name: 'description',
  message: 'How would you describe the app?',
  default: 'there are many like it, but this one is mine.'
}, {
  type: 'text',
  name: 'author',
  message: 'What is your name on GitHub?',
  default: getUserName()
}, {
  type: 'autocomplete',
  name: 'license',
  message: 'Choose a license:',
  suggest: suggestLicenses,
  default: 'ISC'
}, {
  type: 'confirm',
  message: 'Continue?',
  default: true
}]

prompter(questions, (err, values) => {
  if (err) throw err
  console.log(values)
})

function suggestLicenses ({ input }, cb) {
  const suggested = Array.from(licenses)
    .filter(filter(input))
    .sort((a, b) => a.length - b.length)
  cb(null, suggested)
}

function filter (input) {
  return function (text) {
    return new RegExp(input, 'i').exec(text) !== null
    // return new RegExp('^' + input, 'i').exec(text) !== null
  }
}

process.on('unhandledRejection', console.error)
