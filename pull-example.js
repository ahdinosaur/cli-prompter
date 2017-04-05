const pull = require('pull-stream')
const notify = require('pull-notify')
const component = require('pull-stream-model')
const prompter = require('./')

function navigator () {
  return { x: 0, y: 0 }
}

navigator.update = {
  move: ({x, y}, direction) => {
    console.log(x, y, direction)
    switch (direction) {
      case 'north': return {x, y: y + 1}
      case 'south': return {x, y: y - 1}
      case 'east': return {x: x + 1, y}
      case 'west': return {x: x - 1, y}
      default: return {x, y}
    }
  }
}

var questions = notify()
var answers = notify()
var model = component(navigator)

function ask () {
  questions({
    type: 'text',
    message: 'Which direction do you want to go?',
    default: 'north'
  })
}

pull(
  answers.listen(),
  model.store,
  // log updates
  pull.through(console.log),
  pull.collect(function (err, state) {
    // handle if application errored:
    if (err) throw err
    // serialize/reuse end state:
    console.log(state)
  })
)

pull(
  questions.listen(),
  prompter(),
  pull.drain(answer => {
    answers(model.msg.move(answer.undefined))
    ask()
  })
)

// Do the first ask
ask()
