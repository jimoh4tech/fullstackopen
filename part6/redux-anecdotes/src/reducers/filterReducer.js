import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        showFilter(state, action) {
            return action.payload
        }
    }
})

export const { showFilter } = filterSlice.actions
export default filterSlice.reducer