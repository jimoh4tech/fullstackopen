const jwt = require('jsonwebtoken')
const logger = require('./logger')
const morgan = require('morgan')
const User = require('../models/user')

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      req.token = authorization.substring(7)
      
    }else {
        req.token = ''
    }
    next()
}

const userExtractor = async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if(!decodedToken.id) {
        res.status(401).json({error: 'token missing or invalid'})
    }
    req.user = await User.findById(decodedToken.id)
    
    next()
}

const unknwownEndpoint = (req, res) => {
    res.status(404).end({error: 'unknown endpoint'})
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    if(error.name === 'CastError') {
        return res.status(400).send({error: 'malformatted id'})
    } else if(error.name === 'ValidationError') {
        return res.status(400).json({error: error.message})
    }

    next(error)
}

module.exports = {
    unknwownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor,
    morgan
}