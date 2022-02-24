import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'



describe('<Blog />', () => {
  let container
  const blog = {
    author: 'Abu fawzan',
    title: 'Java as a langauge',
    likes: 3,
    url: 'http:////.comd',
    user: {
      name: 'Ada'
    }
  }
  const user = {
    name: 'Ada'
  }

  let mockHandler = jest.fn()

  blogService.update = jest.fn().mockImplementation(() => {
    return Promise.resolve({ success: true })
  })

  beforeEach(() => {
    container = render(<Blog blog={blog} user={user} updateBlog={mockHandler}/>).container
  })

  test('render title and author by default', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
  })


  test('clicking the hide button calls event handler once', async () => {


    const button = screen.getByText('view')
    userEvent.click(button)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(blog.likes)
    expect(div).toHaveTextContent(blog.url)

  })


  test('clicking the like button twices makes the event handler recieves to props', async () => {
    const button = screen.getByText('view')
    userEvent.click(button)

    const likeButton = screen.getByText('like')

    userEvent.dblClick(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})



