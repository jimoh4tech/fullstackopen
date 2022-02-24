import React, { useState } from 'react'
const Blog = ({ blog, updateBlog, deleteBlog, user }) => {

  const [visible, setVisible] = useState(false)

  const handleLikeClick = blog => {
    const { author, id, likes, user, url, title } = blog

    const newBlog = {
      author,
      user,
      url,
      title,
      likes: likes + 1
    }

    updateBlog(id, newBlog)
  }
  const handleDelete = blog => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const viewBlog = () => {
    return (
      <div>
        <div id='test2'>{blog.url}</div>
        <div id='test2'>likes {blog.likes} <button id='like-button' onClick={() => handleLikeClick(blog)}>like</button></div>
        <div>{blog.user ? blog.user.name : ''}</div>
        {user.id === blog.user.id
        && (<button id='remove-button' onClick={() => handleDelete(blog)}>remove</button>) }
      </div>
    )
  }

  return(
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button id='display-button' onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view' }
      </button>
      {visible && viewBlog()}
    </div>
  )}

export default Blog