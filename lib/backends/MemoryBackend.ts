import { Event, Backend, EventPredicate } from '../EventStore'

export default class MemoryBackend implements Backend {
  events: Event[] = []

  constructor() {
    this.events = []
  }

  async append(event: Event) {
    this.events.push(event)
  }

  async filter(fn: EventPredicate) {
    return this.events.filter(fn)
  }
}
