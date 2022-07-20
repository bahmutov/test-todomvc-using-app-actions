import { addTodos, allItems, TODO_ITEM_ONE, TODO_ITEM_TWO } from './utils'

describe('TodoMVC', function () {
  beforeEach(function () {
    cy.visit('/')
  })

  context(
    'When page is initially opened',
    { tags: '@regression' },
    function () {
      it('should focus on the todo input field', function () {
        // get the currently focused element and assert
        // that it has class='new-todo'
        //
        // http://on.cypress.io/focused
        cy.focused().should('have.class', 'new-todo')
      })
    },
  )

  context('No Todos', function () {
    it('should hide #main and #footer', { tags: '@regression' }, function () {
      // Unlike the TodoMVC tests, we don't need to create
      // a gazillion helper functions which are difficult to
      // parse through. Instead we'll opt to use real selectors
      // so as to make our testing intentions as clear as possible.
      //
      // http://on.cypress.io/get
      allItems().should('not.exist')
      cy.get('.main').should('not.exist')
      cy.get('.footer').should('not.exist')
    })
  })

  context('Counter', function () {
    const COUNTER = '.todo-count'

    it(
      'should display the current number of todo items',
      { tags: ['@sanity', '@regression'] },
      function () {
        addTodos(TODO_ITEM_ONE)
        cy.get(COUNTER).contains('1 item left')
        addTodos(TODO_ITEM_TWO)
        cy.get(COUNTER).contains('2 items left')
      },
    )
  })
})
