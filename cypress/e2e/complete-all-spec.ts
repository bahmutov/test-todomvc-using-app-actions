import { addDefaultTodos, allItems, toggle } from './utils'

describe('TodoMVC', function () {
  beforeEach(function () {
    cy.visit('/')
  })

  context('Mark all as completed', { tags: '@complete' }, function () {
    // These tests confirm that we can click one toggle button, and the app
    // marks all items as completed or incomplete again.

    // Selector for the toggle button we are going to use
    const TOGGLE_ALL = '.toggle-all'

    // Note that these tests do NOT create items through the DOM.
    // Instead they use app action "addDefaultTodos" before each test
    beforeEach(addDefaultTodos)

    it(
      'should allow me to mark all items as completed',
      { tags: '@regression' },
      function () {
        // complete all todos
        // we use 'check' instead of 'click'
        // because that indicates our intention much clearer
        cy.get(TOGGLE_ALL).check()

        // get each todo li and ensure its class is 'completed'
        allItems().eq(0).should('have.class', 'completed')
        allItems().eq(1).should('have.class', 'completed')
        allItems().eq(2).should('have.class', 'completed')
      },
    )

    it(
      'should allow me to clear the complete state of all items',
      { tags: ['@sanity', '@regression'] },
      function () {
        // check and then immediately uncheck
        cy.get(TOGGLE_ALL).check().uncheck()

        allItems().eq(0).should('not.have.class', 'completed')
        allItems().eq(1).should('not.have.class', 'completed')
        allItems().eq(2).should('not.have.class', 'completed')
      },
    )

    it('complete all checkbox should update state when items are completed / cleared', () => {
      // alias the .toggle-all for reuse later
      cy.get(TOGGLE_ALL)
        .as('toggleAll')
        .check()
        // this assertion is silly here IMO but
        // it is what TodoMVC does
        .should('be.checked')

      toggle(0)

      // reference the .toggle-all element again
      // and make sure its not checked
      cy.get('@toggleAll').should('not.be.checked')

      toggle(0)

      // assert the toggle all is checked again
      cy.get('@toggleAll').should('be.checked')
    })
  })
})
