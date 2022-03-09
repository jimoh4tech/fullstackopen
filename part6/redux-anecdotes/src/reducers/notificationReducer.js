import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return ''
            
        }
    }
})


export const { showNotification, removeNotification } = notificationSlice.actions

let timeoutID
export const setNotification = (message, sec) => {
    return dispach => {
        dispach(showNotification(message))
        clearTimeout(timeoutID)
        timeoutID = setTimeout(() => {
            dispach(removeNotification())
        }, sec * 1000)
        
    }
}
export default notificationSlice.reducer