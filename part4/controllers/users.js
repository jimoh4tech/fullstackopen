const bcyrpt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (req, res) => {
    const {username, name, password} = req.body

    // username or password must not be missing
    if(!(username && password)) {
        return res.status(400).json({error: 'username or password missing'})
    }

    // Username or password must be at least 3 characters in lenght
    if(username.length < 3 || password.length < 3) {
        return res.status(400).json({error: 'username or password must be at least 3 characters'})
    }

    // username must be unique
    const existingUser = await User.findOne({ username })
    if(existingUser) {
        return res.status(400).json({ error: 'username must be unique' })
    }

    const saltRounds = 10
    const passwordHash = await bcyrpt.hash(password, saltRounds)


    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

userRouter.get('/', async(req, res) => {
    const users = await User
        .find({})
        .populate('blogs', {url: 1, title: 1, author: 1})
    res.json(users)
})

module.exports = userRouter