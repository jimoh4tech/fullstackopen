const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany()
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
}, 100000)


test('blogs returned is in json format', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('blogs returns the correct length', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(2)
})

test('blogs has a unique id for each post', async() => {
    const res = await api.get('/api/blogs')

    for (const content of res.body) {
        expect(content.id).toBeDefined()
    }
})

test('a valid blog can be added', async() => {
    const newBlog = {
        "title": "Testing 5",
        "author": "Abu Ummayza",
        "url": "http://localhost:3003/api/blogs",
        "likes": 54,
    }
    await api
        .post('/api/blogs')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpZCI6IjYyMGQxMTg5OWZlMmMzYmQzMTRhZDc0NSIsImlhdCI6MTY0NTA5MzcwMH0.lsCD1Th_l8mmRzCib6mJ-p4v7pt2kGBo6Zqyf54EmL4')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')
    const contents = res.body.map(r => r.title)
    expect(res.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain('Testing')
})

test('default likes property to value 0 if missing', async() => {
    const newBlog = {
        "title": "Test likes",
        "author": "Dada Ada",
        "url": "http://localhost:3003/api/blogs",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')

    console.log(res.body[helper.initialBlogs.length])
    expect(res.body[helper.initialBlogs.length].likes).toBe(0)

})

test('title and url properties are not missing', async() => {
    const newBlog = {
        "author": "Dada Ada",
        "likes": 6,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

})


describe('deletion of a blog', () => {
    test('succeeds with code 204 if id is valid', async () => {
         const blogsAtStart = await helper.blogsInDb()
         const blogToDetele = blogsAtStart[0]

         await api
            .delete(`/api/blogs/${blogToDetele.id}`)
            .expect(204)

        const blogAtEnd = await helper.blogsInDb()
        
        expect(blogAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const contents = blogAtEnd.map(b => b.title)

        expect(contents).not.toContain(blogToDetele.title)
    })
})

describe('update a blog', () => {
    test('succeeds updating a blog', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const blog = {
            author: blogToUpdate.author,
            title: blogToUpdate.title,
            url: blogToUpdate.url,
            likes: blogToUpdate.likes + 10
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blog)
            .expect(200)
        
        const blogAtEnd = await helper.blogsInDb()
        expect(blogAtEnd[0].likes).toBe(blog.likes)
    })
})


afterAll(() => {
    mongoose.connection.close()
})