const { UserInputError, AuthenticationError } =  require('apollo-server')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = 'JKH*(KJ^&HJH^IJ'

const resolvers = {
    Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        if (!args.author && !args.genre) {
          return Book.find({}).populate('author')
        }
        if (args.author) {
          const author = await Author.findOne({ name: args.author })
          return Book.find({ author: { $in: [author] }} )
        }
        if (args.genre) {
          const author = await Author.findOne({ name: args.genre })
          return Book.find({ author: { $in: [author] }} )
        }
      },
      allAuthors: async () => Author.find({}),
      me: (root, args, context) => {
        return context.currentUser
      },
      filterBook: async (root, args) => {
        return await Book.find({ genres: { $in: [args.genre] } }).populate('author')
      }
  
    },
    Author: {
      bookCount: async (root) => Book.countDocuments({ author: root})
    },
    Mutation: {
      addBook: async (root, args, { currentUser }) => {
  
        if (!currentUser) {
          throw new AuthenticationError('not authenticated')
        }
  
        let author = await Author.findOne({ name: args.author})
  
        if (!author) {
          const newAuthor = new Author({ name: args.author })
          try {
            await newAuthor.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args.author
            })
          }
        }
        author = await Author.findOne({ name: args.author})
        const book = new Book({ ...args, author})
  
        try {
          await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }

        pubsub.publish('BOOK_ADDED', { bookAdded: book })

        return book
      },
      editAuthor: async (root, args, { currentUser }) => {
        if (!currentUser) {
          throw new AuthenticationError('not authenticated')
        }
  
        const author = await Author.findOne({name: args.name })
        author.born = args.setBornTo
  
        try {
          await author.save() 
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return author
      },
      createUser: async (root, args) => {
        const user = new User({ ...args })
  
        return user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
  
        if (!user || args.password !== 'check' ) {
          throw new UserInputError('wrong credentials')
        }
  
        const userForToken = {
          username: user.username,
          id: user._id
        }
  
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      }
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
      },
    }
}

  module.exports = resolvers
