import { createSlice } from '@reduxjs/toolkit'

const initialState = null

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    saveUser(state, action) {
      return action.payload
    }
  }
})

export const { saveUser } = userSlice.actions

export const persistUser = user => {
  return dispatch => {
    dispatch(saveUser(user))
  }
}

export default userSlice.reducer