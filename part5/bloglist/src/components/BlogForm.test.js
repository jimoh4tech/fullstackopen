import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm/> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const { container } = render(<BlogForm createBlog={createBlog}/>)

  const authorInput = container.querySelector('#author-input')
  const titleInput = container.querySelector('#title-input')
  const urlInput = container.querySelector('#url-input')
  const sendButton = screen.getByText('create')

  userEvent.type(authorInput, 'Umar Yakub')
  userEvent.type(titleInput, 'Testing with jest')
  userEvent.type(urlInput, 'http:.///comf')
  userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('Umar Yakub')
  expect(createBlog.mock.calls[0][0].title).toBe('Testing with jest')
  expect(createBlog.mock.calls[0][0].url).toBe('http:.///comf')
})