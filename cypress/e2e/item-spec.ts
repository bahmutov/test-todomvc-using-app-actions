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
    cy.visit('/')
  })

  context('Item', { tags: '@item' }, function () {
    it(
      'should allow me to mark items as complete',
      { tags: ['@sanity', '@regression'] },
      function () {
        addTodos(TODO_ITEM_ONE, TODO_ITEM_TWO)

        allItems().eq(0).as('firstTodo')
        allItems().eq(1).as('secondTodo')

        cy.get('@firstTodo').find('.toggle').check()
        cy.get('@firstTodo').should('have.class', 'completed')

        cy.get('@secondTodo').should('not.have.class', 'completed')
        cy.get('@secondTodo').find('.toggle').check()

        cy.get('@firstTodo').should('have.class', 'completed')
        cy.get('@secondTodo').should('have.class', 'completed')
      },
    )

    it(
      'should allow me to un-mark items as complete',
      { tags: '@regression' },
      function () {
        addTodos(TODO_ITEM_ONE, TODO_ITEM_TWO)

        allItems().eq(0).as('firstTodo')
        allItems().eq(1).as('secondTodo')

        cy.get('@firstTodo').find('.toggle').check()
        cy.get('@firstTodo').should('have.class', 'completed')
        cy.get('@secondTodo').should('not.have.class', 'completed')

        cy.get('@firstTodo').find('.toggle').uncheck()
        cy.get('@firstTodo').should('not.have.class', 'completed')
        cy.get('@secondTodo').should('not.have.class', 'completed')
      },
    )

    it('should allow me to edit an item', function () {
      addDefaultTodos()

      allItems()
        .eq(1)
        .as('secondTodo')
        // TODO: fix this, dblclick should
        // have been issued to label
        .find('label')
        .dblclick()

      // clear out the inputs current value
      // and type a new value
      cy.get('@secondTodo')
        .find('.edit')
        .clear()
        .type('buy some sausages')
        .type('{enter}')

      // explicitly assert about the text value
      allItems().eq(0).should('contain', TODO_ITEM_ONE)
      cy.get('@secondTodo').should('contain', 'buy some sausages')
      allItems().eq(2).should('contain', TODO_ITEM_THREE)
    })
  })
})
