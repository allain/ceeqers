const NanoEmitter = require('nanoevents')

function EventStore (opts = {}) {
  const emitter = new NanoEmitter()
  const events = []

  return {
    append: event => {
      events.push(event)
      emitter.emit('changed')
      emitter.emit(event.type, event)
    },
    listen: (event, handler) => {
      events.filter(e => e.type === event).forEach(handler)
      emitter.on(event, handler)
    },
    on: function () {
      emitter.on.apply(emitter, arguments)
    }
  }
}

module.exports = EventStore
