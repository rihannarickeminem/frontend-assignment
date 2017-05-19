export const SET_MARK_POSITION = 'SET_MARK_POSITION'

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

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
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
  1: { x: 5, y: 8,
    marKey: 1,
    placedX: undefined, placedY: undefined},
  2: { x: 4, y: 3,
    marKey: 2,
    placedX: undefined, placedY: undefined},
  3: { x: 7, y: 1,
    marKey: 3,
    placedX: undefined, placedY: undefined},
  4: { x: 8, y: 0,
    marKey: 4,
    placedX: undefined, placedY: undefined},
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
