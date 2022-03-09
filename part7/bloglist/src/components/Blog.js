import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'

const Blog = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const handleLikeClick = blog => {
    dispatch(updateBlog(blog))
    dispatch(setNotification(`You liked ${blog.title} by ${blog.author}`, 5))
  }
  const handleDelete = blog => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
      dispatch(setNotification(`Deleted blog ${blog.title} by ${blog.author}`, 5))
    }
  }
  return(
    <div>
      <h1>{blog.title} {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div></div>{blog.likes} likes
      <button id='like-button' onClick={() => handleLikeClick(blog)}>like</button>
      <div></div>
      added by {blog.user ? blog.user.name : ''}
      {user.id === blog.user.id
        && (<button id='remove-button' onClick={() => handleDelete(blog)}>remove</button>) }
    </div>
  )}

export default Blog