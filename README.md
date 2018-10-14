# ceeqers

An Event Sourcing library that's appreciates but is not bound to CQRS ideas.

## Dreamcode Usage (not implemented yet)
```ts
const CONFIG = ...

import EventStore from 'EventStore'

const es = new EventStore(CONFIG)
const el = new EventListener(es, {type: 'tested'})
const reduction = new EventReducer((result, event) => result + event.payload, '', {id: 'concatenation'})

es.store({ type: 'tested', payload: 'A'})
es.store({ type: 'tested', payload: 'B'})

```
