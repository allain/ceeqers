import * as EventEmitter from 'events'
import MemoryBackend from './backends/MemoryBackend'

const pEach = fn => async arr => {
  for (let item of arr) {
    await fn(item)
  }
}

export type EventPredicate = (Event) => boolean

export interface Backend {
  append(event: Event): Promise<any>
  filter(fn: EventPredicate): Promise<Event[]>
}

export interface Event {
  type: string,
  payload?: any
}

type EventHandler = (Event) => (void | Promise<any>)

type EventStoreOptions = {
  backend?: Backend
}

class EventStore {
  emitter: EventEmitter = new EventEmitter()
  backend: Backend

  constructor(opts: EventStoreOptions = {}) {
    this.backend = opts.backend || new MemoryBackend()
  }
  async append(event: Event) {
    await this.backend.append(event)

    this.emitter.emit('changed')
    this.emitter.emit(event.type, event)
  }

  async listen(eventName: string, handler: EventHandler) {
    const history = await this.backend.filter(e => e.type === eventName)

    let processing = pEach(handler)(history)
    this.emitter.on(eventName, event => {
      processing = processing.then(() => handler(event))
    })
  }


  on(...args) {
    this.emitter.on.apply(this.emitter, args)
  }
}

export default EventStore
