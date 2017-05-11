// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'

// ------------------------------------
// Actions
// ------------------------------------
// export function increment (value = 1) {
//   return {
//     type: COUNTER_INCREMENT,
//     payload: value
//   }
// }

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */

// export const doubleAsync = () => {
//   return (dispatch, getState) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         dispatch(increment(getState().grid))
//         resolve()
//       }, 200)
//     })
//   }
// }

export const actions = {
  // increment,
  // doubleAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]: (state, action) => state + action.payload
}
const requiredXYs = {
  1: { x: 5, y: 8},
  2: { x: 4, y: 3},
  3: { x: 7, y: 1},
  4: { x: 8, y: 0},
};
const defaultXYs = {
  1: {},
  2: {},
  3: {},
  4: {},
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  defaultXYs,
  requiredXYs,
}
export default function gridReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
