import {
  addTodos,
  allItems,
  TODO_ITEM_ONE,
  TODO_ITEM_TWO,
  toggle,
} from './utils'

describe('TodoMVC', function () {
  beforeEach(function () {
    cy.visit('/')
  })

  context('Persistence', { tags: '@persistence' }, function () {
    // mimicking TodoMVC tests
    // by writing out this function
    function testState() {
      allItems()
        .eq(0)
        .should('contain', TODO_ITEM_ONE)
        .and('have.class', 'completed')
      allItems()
        .eq(1)
        .should('contain', TODO_ITEM_TWO)
        .and('not.have.class', 'completed')
    }

    it(
      'should persist its data',
      { tags: ['@sanity', '@regression'] },
      function () {
        addTodos(TODO_ITEM_ONE, TODO_ITEM_TWO)
        toggle(0).then(testState).reload().then(testState)
      },
    )
  })
})
