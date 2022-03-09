import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'
const initialState = null

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    appendUsers(state, action) {
      return action.payload
    }
  }
})

export const { appendUsers } = usersSlice.actions

export const setUSers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch(appendUsers(users))
  }
}

export default usersSlice.reducer