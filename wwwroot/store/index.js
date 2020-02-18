// https://www.npmjs.com/package/unistore
import { createStore } from "/web_modules/unistore/full/preact.es.js"

import unistoreDevTools from "./unistore.devtools.js"

const store = createStore({ count: 0, stuff: [] })
unistoreDevTools(store)

const actions = {
  // Actions can just return a state update:
  increment(state) {
    // The returned object will be merged into the current state
    return { count: state.count + 1 }
  },

  // The above example as an Arrow Function:
  increment2: ({ count }) => ({ count: count + 1 }),

  // Actions receive current state as first parameter and any other params next
  // See the "Increment by 10"-button below
  incrementBy: ({ count }, incrementAmount) => {
    return { count: count + incrementAmount }
  },
}

// If actions is a function, it gets passed the store:
let actionFunctions = store => ({
  // Async actions can be pure async/promise functions:
  async getStuff(state) {
    const res = await fetch("/foo.json")
    return { stuff: await res.json() }
  },

  // ... or just actions that call store.setState() later:
  clearOutStuff(state) {
    setTimeout(() => {
      store.setState({ stuff: [] }) // clear 'stuff' after 1 second
    }, 1000)
  },

  // Remember that the state passed to the action function could be stale after
  // doing async work, so use getState() instead:
  async incrementAfterStuff(state) {
    const res = await fetch("foo.json")
    const resJson = await res.json()
    // the variable 'state' above could now be old,
    // better get a new one from the store
    const upToDateState = store.getState()

    return {
      stuff: resJson,
      count: upToDateState.count + resJson.length,
    }
  },
})

export default store
