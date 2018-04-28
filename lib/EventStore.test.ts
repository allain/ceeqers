import EventStore, { Event } from './EventStore'
const waitMillis = ms => new Promise(resolve => setTimeout(() => resolve(), ms))

describe('EventStore', () => {
  it('emits change event when appended to', cb => {
    const store = new EventStore()
    store.on('changed', () => cb())
    store.append({ type: 'tested' })
  })

  it('can be listened to', async cb => {
    const store = new EventStore()
    await store.listen('tested', () => cb())
    store.append({ type: 'tested' })
  })

  it('events from even before listening are received', async cb => {
    const store = new EventStore()
    store.append({ type: 'tested' })
    await store.listen('tested', () => cb())
  })

  it('events received while playing back are handled correctly', async cb => {
    let count = 0
    const store = new EventStore()
    const received = []
    store.append({ type: 'tested', payload: { count: ++count } })
    store.listen('tested', (event: Event) => {
      received.push(event)
      if (event.payload.count === 1) return waitMillis(100)
      if (event.payload.count === 4) {
        // last one
        expect(received.map(e => e.payload.count)).toEqual([1, 2, 3, 4])
        cb()
      }
    })
    store.append({ type: 'tested', payload: { count: ++count } })
    store.append({ type: 'tested', payload: { count: ++count } })
    store.append({ type: 'tested', payload: { count: ++count } })
  })
})
