import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('green')



  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs( blogs ))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )


      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')


    } catch (exception) {
      setColor('red')
      setMessage('Wrong username or password')
      setTimeout(() => setMessage(null), 5000)
    }

  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const newBlog = blogObject => {

    blogService
      .create(blogObject)
      .then(b => {
        setBlogs(blogs.concat(b))
        setColor('green')
        setMessage(`a new blog ${b.title} by ${b.author}`)
        setTimeout(() => setMessage(null), 5000)
      })
      .catch(error => {
        setColor('red')
        setMessage(error.message)
        setTimeout(() => setMessage(null), 5000)
      })

  }

  const updateBlog = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then(b => setBlogs(blogs.map(blog => blog.id !== b.id ? blog : b)))
      .catch(error => {
        setColor('red')
        setMessage(error.message)
        setTimeout(() => setMessage(null), 5000)
      })
  }

  const deleteBlog = async (blogObject) => {
    blogService
      .remove(blogObject)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
        setColor('green')
        setMessage(`Deleted blog ${blogObject.title} by ${blogObject.author}`)
        setTimeout(() => setMessage(null), 5000)
      })
      .catch(err => {
        setColor('red')
        setMessage(err.message)
        setTimeout(() => setMessage(null), 5000)
      })
  }


  if(user === null) {
    return (
      <div>
        <Notification color={color} message={message} />
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification color={color} message={message} />
      <p>
        {user.name} logged in
        <button id='logout-button' onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="new blog">
        <BlogForm
          createBlog={newBlog}
        />
      </Togglable>

      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user}
        />
      )}
    </div>
  )
}


export default App