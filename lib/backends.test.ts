// Since all backends must suppor the same contract, implementing a single test suits here

import MemoryBackend from './backends/MemoryBackend'

const backends = {
  memory: () => new MemoryBackend()
}

// Backend makers for testing
for (let name of Object.keys(backends)) {
  describe(name, () => {
    it("supports construction", () => {
      const b = backends[name]()
      expect(typeof b).toEqual('object')
    })

    it('supports clearing all', () => {
      const b = backends[name]()
      b.deleteAllEvents()
    })

    it('recordEvent works', () => {
      const b = backends[name]()
      return b.recordEvent({ type: 'Testing' })
    })
  })
}