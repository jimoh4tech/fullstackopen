import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from './queries'

const LoginForm = ({ setToken, show }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN)


  useEffect(() => {
      if (result.data) {
        const token = result.data.login.value
        setToken(token)
        localStorage.setItem('library-user-token', token)
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  const handleLogin = event => {
    event.preventDefault()

    login({variables: {username, password}})
    setUsername('')
    setPassword('')
  }

  if (!show) {
      return null
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        name: 
        <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
      <input 
        type='password'
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      </div>
      
      <button type='submit'>login</button>
    </form>
    )
}

export default LoginForm