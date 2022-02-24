import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()

    createBlog({
      author,
      title,
      url
    })

    setAuthor('')
    setTitle('')
    setUrl('')

  }


  return (
    <div>
      <h2>create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>title:
          <input
            type='text'
            value={title}
            name='Title'
            id='title-input'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>author:
          <input
            type='text'
            value={author}
            name='Author'
            id='author-input'
            onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='Url'
            id='url-input'
            onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button id='create-button' type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm