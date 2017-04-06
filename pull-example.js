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
var app = component(navigator)
var question = app.ask = notify()
var answer = app.answer = notify()

// listen for answers, these area state updates
pull(
  answer.listen(),
  app.store,
  // see new
  pull.through(console.log),
  // handle end when applications ends:
  pull.collect(function (err, history) {
    if (err) throw err
    // state history:
    console.log(history)
  })
)

function ask (direction) {
  question({
    type: 'text',
    name: 'direction',
    message: 'Which direction do you want to go?',
    default: direction || 'north'
  })
}

// listen for questions to prompt, get answer to update state, then repeat
pull(
  question.listen(),
  prompter(),
  pull.drain(direction => {
    answer(app.msg.move(direction))
    ask(direction)
  })
)

// start
ask()
