describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Adam Joy',
      username: 'adam',
      password: 'adam'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#username')
    cy.get('#password')
    cy.contains('login')

  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'adam', password: 'adam' })

      cy.contains('Adam Joy logged in')
    })

    it('login fails with wrong password', function() {
      cy.get('#username').type('adam')
      cy.get('#password').type('worong')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'adam', password: 'adam' })
      })

      it('A blog can be created', function() {
        cy.createBlog({
          author: 'Musa Idris',
          title: 'Testing with cypress is fun',
          url: 'http://3000.com'
        })
        cy.contains('Testing with cypress is fun Musa Idris')
      })

      describe('and a blog exist', function() {
        beforeEach(function() {
          cy.createBlog({
            author: 'Musa Idris',
            title: 'Testing with cypress is fun',
            url: 'http://3000.com'
          })
        })

        it('User can like a blog', function() {
          cy.get('#display-button').click()
          cy.get('#like-button').click()
          cy.contains('1')
        })

        it('Blog created by user can be delete', function() {
          cy.get('#logout-button').click()
          cy.get('#username').type('adam')
          cy.get('#password').type('adam')
          cy.get('#login-button').click()
          cy.get('#display-button').click()
          cy.get('#remove-button').click()

          cy.get('html').should('not.contain', 'Testing with cypress is fun Musa Idris' )

        })
      })

      it('Ensure that blogs are in order of likes', function() {
        cy.createBlog({
          author: 'John Ugo',
          title: 'Testing 1',
          url: 'http://3muj.com'
        })
        cy.createBlog({
          author: 'Swiss Deen',
          title: 'Testing 2',
          url: 'http://3mum.ng'
        })
        cy.createBlog({
          author: 'Swiss Deen',
          title: 'Testing 3',
          url: 'http://3mum.ng'
        })

        cy.contains('Testing 1').as('blog1')
        cy.contains('Testing 2').as('blog2')
        cy.contains('Testing 3').as('blog3')

        cy.get('@blog1').contains('view').click()
        cy.get('@blog2').contains('view').click()
        cy.get('@blog3').contains('view').click()

        cy.get('@blog1').contains('like').as('like1')
        cy.get('@blog2').contains('like').as('like2')
        cy.get('@blog3').contains('like').as('like3')

        cy.get('@like2').click()
        cy.wait(1000)
        cy.get('@like2').click()
        cy.wait(1000)
        cy.get('@like2').click()
        cy.wait(1000)
        cy.get('@like2').click()
        cy.wait(1000)
        cy.get('@like2').click()
        cy.wait(1000)
        cy.get('@like1').click()
        cy.wait(1000)
        cy.get('@like1').click()
        cy.wait(1000)
        cy.get('@like1').click()
        cy.wait(1000)
        cy.get('@like3').click()
        cy.wait(1000)
        cy.get('@like3').click()
        cy.wait(1000)
        cy.get('@like2').click()
        cy.wait(1000)

        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).contains('6')
          cy.wrap(blogs[1]).contains('3')
          cy.wrap(blogs[2]).contains('2')
        })
      })
    })

  })

})