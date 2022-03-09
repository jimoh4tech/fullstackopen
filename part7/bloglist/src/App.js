import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { initializeBogs } from './reducers/blogReducer'
import { useDispatch , useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { persistUser } from './reducers/userReducer'
import { BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Users from './components/Users'
import { setUSers } from './reducers/usersReducer'
import User from './components/User'
import { Button, Navbar, Nav } from 'react-bootstrap'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')



  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBogs())
    dispatch(setUSers())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs).map(blogs => blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(persistUser(user))
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

      dispatch(persistUser(user))
      setUsername('')
      setPassword('')


    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 5))
    }

  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(persistUser(null))
  }
  const padding = {
    paddingRight: 5
  }
  return (
    <div className='container'>
      <Router>

        <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to='/'>blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to='/users'>users</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {user && user.name} logged in
                <Button onClick={handleLogout}>
                  logout
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div>

          <h2>blog app</h2>
        </div>

        <Routes>
          <Route path='/users' element={<Users />}/>
          <Route path='/users/:id' element={<User />}/>
          <Route path='/blogs/:id' element={<Blog />}/>
          <Route path='/' element={
            user ?
              <div>
                <Notification/>
                <Togglable buttonLabel="new blog">
                  <BlogForm/>
                </Togglable>
                <Blogs blogs={blogs}/>
              </div>
              :
              <div>
                <Notification />
                <LoginForm
                  handleSubmit={handleLogin}
                  handleUsernameChange={({ target }) => setUsername(target.value)}
                  handlePasswordChange={({ target }) => setPassword(target.value)}
                  username={username}
                  password={password}
                />
              </div>
          }/>
        </Routes>
      </Router>

    </div>
  )
}


export default App