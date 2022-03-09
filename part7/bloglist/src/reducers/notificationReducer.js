import { createSlice } from '@reduxjs/toolkit'

const initialState = null

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return null
    }
  }
})

export const { showNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, sec) => {
  return dispatch => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, sec * 1000)
  }
}

export default notificationSlice.reducer