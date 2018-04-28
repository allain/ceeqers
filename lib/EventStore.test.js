const EventStore = require('./EventStore')

describe('EventStore', () => {
  it('exposes expected API', () =>
    expect(typeof EventStore).toEqual('function'))

  it('emits change event when appended to', cb => {
    const store = EventStore()
    store.on('changed', () => cb())
    store.append({ type: 'tested' })
  })

  it('can be listened to', cb => {
    const store = EventStore()
    store.listen('tested', () => cb())
    store.append({ type: 'tested' })
  })

  it('events from even before listening are received', cb => {
    const store = EventStore()
    store.append({ type: 'tested' })
    store.listen('tested', () => cb())
  })
})
