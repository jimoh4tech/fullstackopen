import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    likeBlog(state, action) {
      const blogToChange = action.payload
      return state.map(blog =>
        blog.id === blogToChange.id ? blogToChange : blog)
    },
    removeBlog(state, action) {
      const removedBlog = action.payload
      return state.filter(blog => blog.id !== removedBlog.id)
    }
  }
})

export const { appendBlog, setBlogs, likeBlog, removeBlog } = blogSlice.actions

export const initializeBogs = () => {
  return async dispatch => {
    const blogs =  await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const updateBlog = blog => {
  return async dispatch => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const upadateBlog = await blogService.update(newBlog)

    dispatch(likeBlog(upadateBlog))
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch(removeBlog(blog))
  }
}
export default blogSlice.reducer