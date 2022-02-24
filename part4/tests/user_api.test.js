const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const supertest = require('supertest')
const User = require('../models/user')

const api = supertest(app)
const helper = require('./test_helper')


describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('correct', 10)
        const user = new User({username: 'root', passwordHash})

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'adams',
            name: 'Adams Smith',
            password: 'correct'
        }

        await api  
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        
            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

            const usernames = usersAtEnd.map(u => u.username)
            expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username and password is lessthan 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'hi',
            name: 'Hello',
            password: 'Be'
        }

        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
            expect(res.body.error).toContain('username or password must be at least 3 characters')

            const userAtEnd = await helper.usersInDb()
            expect(userAtEnd).toEqual(usersAtStart)

    })

    test('creation fails with proper statuscode and message if username already taken', async() => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Admin',
            password: 'rootmin',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('username must be unique')

            const userAtEnd = await helper.usersInDb()
            expect(userAtEnd).toEqual(usersAtStart)
    })
})

afterAll(() => {
    mongoose.connection.close()
})