import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    const newBlog = {
      author,
      title,
      url
    }
    dispatch(createBlog(newBlog))

    setAuthor('')
    setTitle('')
    setUrl('')

  }


  return (
    <div>
      <h2>create a new blog</h2>

      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button variant='primary' type='submit'>
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm