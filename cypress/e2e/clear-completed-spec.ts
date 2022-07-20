import {
  addDefaultTodos,
  allItems,
  TODO_ITEM_ONE,
  TODO_ITEM_THREE,
  toggle,
} from './utils'

describe('TodoMVC', function () {
  beforeEach(function () {
    cy.visit('/')
  })

  context('Clear completed button', { tags: '@complete' }, function () {
    const CLEAR_COMPLETED = '.clear-completed'

    beforeEach(addDefaultTodos)

    it('should display the correct text', function () {
      toggle(0)
      cy.get(CLEAR_COMPLETED).contains('Clear completed')
    })

    it(
      'should remove completed items when clicked',
      { tags: ['@sanity', '@regression'] },
      function () {
        toggle(1)
        cy.get(CLEAR_COMPLETED).click()
        allItems().should('have.length', 2)
        allItems().eq(0).should('contain', TODO_ITEM_ONE)
        allItems().eq(1).should('contain', TODO_ITEM_THREE)
      },
    )

    it(
      'should be hidden when there are no items that are completed',
      { tags: '@regression' },
      function () {
        toggle(1)
        cy.get(CLEAR_COMPLETED).should('be.visible').click()
        cy.get(CLEAR_COMPLETED).should('not.exist')
      },
    )
  })
})
