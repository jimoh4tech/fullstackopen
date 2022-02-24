const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')
require('express-async-errors')

const userExtractor = middleware.userExtractor

blogsRouter.get('/', async(req, res) => {

    const blogs = await Blog
        .find({})
        .populate('user', {username: 1, name: 1})

    res.json(blogs)
})

blogsRouter.get('/:id', (req, res, next) => {
    Blog.findById(req.params.id)
        .populate('user', {username: 1, name: 1})
        .then(blog => {
            if(blog){
                res.json(blog)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

blogsRouter.post('/', userExtractor, async(req, res) => {
    const body = req.body
    
    const user = req.user
    if(!body.title && !body.url)
        return res.status(400).end()

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        date: new Date(),
        user: user._id
    })
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async(req, res) => {
    
    const blog = await Blog.findById(req.params.id)
    
    const userId = req.user._id

    if(blog.user.toString() !== userId.toString()) {
        res.status(401).json({error: 'unauthorzed to delete this blog'})
    }
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

blogsRouter.put('/:id', async(req, res) => {
    const body = req.body
    
    const blog = {
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes,
    }

    const updatedBlog = await Blog
        .findByIdAndUpdate(req.params.id, blog, {new: true, runValidators: true})
        .populate('user', {username: 1, name: 1})
    res.status(200).json(updatedBlog)
})


module.exports = blogsRouter