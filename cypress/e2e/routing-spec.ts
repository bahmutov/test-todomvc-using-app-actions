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

  context('Routing', { tags: '@routing' }, function () {
    /**
     * Little utility function to click on a given filter on the page.
     * We are testing routing links, so these tests go through the DOM.
     */
    const clickFilter = (name: string) =>
      cy.get('.filters').contains(name).click()

    // but for everything else, like created todos and toggling, these tests
    // use app actions.
    beforeEach(addDefaultTodos)

    it(
      'should allow me to display active items',
      { tags: '@regression' },
      function () {
        toggle(1)
        // the UI feature we are actually testing - the "Active" link
        clickFilter('Active')
        allItems().eq(0).should('contain', TODO_ITEM_ONE)
        allItems().eq(1).should('contain', TODO_ITEM_THREE)
      },
    )

    it('should respect the back button', function () {
      toggle(1)
      clickFilter('Active')
      clickFilter('Completed')
      allItems().should('have.length', 1)
      cy.go('back')
      allItems().should('have.length', 2)
      cy.go('back')
      allItems().should('have.length', 3)
    })

    it(
      'should allow me to display completed items',
      { tags: ['@sanity', '@regression'] },
      function () {
        toggle(1)
        clickFilter('Completed')
        allItems().should('have.length', 1)
      },
    )

    it(
      'should allow me to display all items',
      { tags: '@regression' },
      function () {
        toggle(1)
        clickFilter('Active')
        clickFilter('Completed')
        clickFilter('All')
        allItems().should('have.length', 3)
      },
    )

    it('should highlight the currently applied filter', function () {
      // using a within here which will automatically scope
      // nested 'cy' queries to our parent element <ul.filters>
      cy.get('.filters').within(function () {
        cy.contains('All').should('have.class', 'selected')
        cy.contains('Active').click().should('have.class', 'selected')
        cy.contains('Completed').click().should('have.class', 'selected')
      })
    })
  })
})
