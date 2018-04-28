import { Event, Backend, EventPredicate } from '../EventStore'

export default class MemoryBackend implements Backend {
  events: Event[] = []

  constructor() {
    this.events = []
  }

  async recordEvent(event: Event) {
    this.events.push(event)
  }

  async deleteAllEvents() {
    this.events = []
  }

  async filter(fn: EventPredicate) {
    return this.events.filter(fn)
  }
}