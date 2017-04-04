const pull = require('pull-stream')
const pullNotify = require('pull-notify')
const prompter = require('./')

var questions = pullNotify()

var currentLocation = {
  x: 0,
  y: 1
}

pull(
  questions.listen(),
  prompter(),
  pull.drain(values => {
    console.log('value', values)
    questions(nextQuestion(values))
  })
)

questions(nextQuestion())

function nextQuestion (values) {
  return {
    type: 'text',
    name: 'move',
    message: 'What direction do you want to move in?',
    default: 'south'
  }
}
