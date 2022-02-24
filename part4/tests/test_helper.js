const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        "title": "The Connection",
        "author": "Abu Fawzan",
        "url": "http://localhost:3003/api/blogs",
        "likes": 45,
    },
    {
        "title": "The Enternity",
        "author": "Abu Abdillah",
        "url": "http://localhost:3003/api/blogs",
        "likes": 4,
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}