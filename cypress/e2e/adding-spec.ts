import {
  addDefaultTodos,
  addTodos,
  allItems,
  TODO_ITEM_ONE,
  TODO_ITEM_THREE,
  TODO_ITEM_TWO,
} from './utils'

describe('TodoMVC', function () {
  beforeEach(function () {
    let title: string
    cy.visit('/')
    cy.title().then((t) => {
      title = t
    })
  })

  context('New Todo', { tags: '@adding' }, function () {
    // These tests confirm that add new Todo items works.
    // All tests go through the DOM and events just like a real user would.

    // Input element selector for typing new todo title
    const NEW_TODO = '.new-todo'

    it(
      'should allow me to add todo items',
      { tags: '@regression' },
      function () {
        cy.get(NEW_TODO).type(TODO_ITEM_ONE).type('{enter}')
        allItems().eq(0).find('label').should('contain', TODO_ITEM_ONE)
        cy.get(NEW_TODO).type(TODO_ITEM_TWO).type('{enter}')
        allItems().eq(1).find('label').should('contain', TODO_ITEM_TWO)
      },
    )

    it('adds new items using a custom command', () => {
      cy.addTodo(TODO_ITEM_ONE)
      allItems().eq(0).find('label').should('contain', TODO_ITEM_ONE)
    })

    it('adds items', { tags: ['@sanity', '@regression'] }, function () {
      // create several todos then check the number of items in the list
      cy.get(NEW_TODO)
        .type('todo A{enter}')
        .type('todo B{enter}') // we can continue working with same element
        .type('todo C{enter}') // and keep adding new items
        .type('todo D{enter}')
      allItems().should('have.length', 4)
    })

    it(
      'should clear text input field when an item is added',
      { tags: '@regression' },
      function () {
        cy.get(NEW_TODO).type(TODO_ITEM_ONE).type('{enter}')
        cy.get(NEW_TODO).should('have.text', '')
      },
    )

    it('should append new items to the bottom of the list', function () {
      // this is an example of a custom command
      // which is stored in tests/_support/spec_helper.js
      // you should open up the spec_helper and look at
      // the comments!
      addDefaultTodos()

      // even though the text content is split across
      // multiple <span> and <strong> elements
      // `cy.contains` can verify this correctly
      cy.get('.todo-count').contains('3 items left')

      allItems().eq(0).find('label').should('contain', TODO_ITEM_ONE)
      allItems().eq(1).find('label').should('contain', TODO_ITEM_TWO)
      allItems().eq(2).find('label').should('contain', TODO_ITEM_THREE)
    })

    it('should trim text input', { tags: '@regression' }, function () {
      // this is an example of another custom command
      // since we repeat the todo creation over and over
      // again. It's up to you to decide when to abstract
      // repetitive behavior and roll that up into a custom
      // command vs explicitly writing the code.
      cy.get(NEW_TODO).type(`    ${TODO_ITEM_ONE}    {enter}`)

      // we use as explicit assertion here about the text instead of
      // using 'contain' so we can specify the exact text of the element
      // does not have any whitespace around it
      allItems().eq(0).should('have.text', TODO_ITEM_ONE)
    })

    it('should show #main and #footer when items added', function () {
      addTodos(TODO_ITEM_ONE)
      cy.get('.main').should('be.visible')
      cy.get('.footer').should('be.visible')
    })
  })

  context('Adds items (spy example)', () => {
    it('calls inform', () => {
      cy.window()
        .its('model')
        .should('be.an', 'object')
        .then((model) => {
          cy.spy(model, 'inform').as('inform')
        })
      addDefaultTodos()
      cy.get('@inform').should('have.been.calledOnce')
    })
  })
})
