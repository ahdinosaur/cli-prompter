const pull = require('pull-stream')
const notify = require('pull-notify')
const component = require('pull-stream-model')
const prompter = require('./')

// Initial state:
function navigator () {
  return {
    x: Math.floor(Math.random() * 50),
    y: Math.floor(Math.random() * 50)
  }
}

navigator.update = {
  // `move` message,
  move: ({ x, y }, direction) => {
    switch (direction) {
      case 'north': return { x, y: y + 1 }
      case 'south': return { x, y: y - 1 }
      case 'east': return { x: x + 1, y }
      case 'west': return { x: x - 1, y }
      // unknown, move nowhere:
      default: return { x, y }
    }
  }
}

// application
var questions = notify()
var answers = notify()
var model = component(navigator)

// take answers (where you want to go) and update model (the direction)
pull(
  answers.listen(),
  model.store,
  // see new
  pull.through(console.log),
  // handle end when applications ends:
  pull.collect(function (err, history) {
    if (err) throw err
    // state history:
    console.log(history)
  })
)

function ask () {
  questions({
    type: 'text',
    name: 'direction',
    message: 'Which direction do you want to go?',
    default: 'north'
  })
}

// a loop that asks question, updates state, repeat
pull(
  questions.listen(),
  prompter(),
  pull.drain(answer => {
    answers(model.msg.move(answer))
    ask()
  })
)

// start
ask()
