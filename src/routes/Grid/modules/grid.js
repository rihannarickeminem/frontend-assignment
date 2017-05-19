// ------------------------------------
// Constants
// ------------------------------------
// export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const SET_MARK_POSITION = 'SET_MARK_POSITION'

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

export const setMarkPosition = (props, item) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(setPosition(props, item))
        resolve()
      }, 200)
    })
  }
}
export function setPosition (props, item) {
  return {
    type: SET_MARK_POSITION,
    payload: {
      x: props.x,
      y: props.y,
      requiredXY: item.requiredXY,
    }
  }
}

// export const actions = {
  // setMarkPosition,
//   // increment,
//   // doubleAsync
// }

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  // [COUNTER_INCREMENT]: (state, action) => state + action.payload
  [SET_MARK_POSITION]: (state, action) => {
    Object.assign(
      state.requiredXYs[
        action.payload.requiredXY.marKey],
      {placedX: action.payload.x,
        placedY: action.payload.y})
    return state
  },
}
const requiredXYs = {
  1: { x: 5, y: 8, placedX: null, placedY: null},
  2: { x: 4, y: 3, placedX: null, placedY: null},
  3: { x: 7, y: 1, placedX: null, placedY: null},
  4: { x: 8, y: 0, placedX: null, placedY: null},
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
