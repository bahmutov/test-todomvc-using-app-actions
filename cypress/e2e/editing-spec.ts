import {
  addDefaultTodos,
  allItems,
  TODO_ITEM_ONE,
  TODO_ITEM_TWO,
  TODO_ITEM_THREE,
} from './utils'

describe('TodoMVC', function () {
  beforeEach(function () {
    cy.visit('/')
  })

  context('Editing', { tags: '@editing' }, function () {
    beforeEach(addDefaultTodos)

    it('should hide other controls when editing', function () {
      allItems().eq(1).as('secondTodo').find('label').dblclick()

      cy.get('@secondTodo').find('.toggle').should('not.be.visible')
      cy.get('@secondTodo').find('label').should('not.be.visible')
    })

    it('should save edits on blur', { tags: '@sanity' }, function () {
      allItems().eq(1).as('secondTodo').find('label').dblclick()

      cy.get('@secondTodo')
        .find('.edit')
        .clear()
        .type('buy some sausages')
        // we can just send the blur event directly
        // to the input instead of having to click
        // on another button on the page. though you
        // could do that its just more mental work
        .blur()

      allItems().eq(0).should('contain', TODO_ITEM_ONE)
      cy.get('@secondTodo').should('contain', 'buy some sausages')
      allItems().eq(2).should('contain', TODO_ITEM_THREE)
    })

    it('should trim entered text', function () {
      allItems().eq(1).as('secondTodo').find('label').dblclick()

      cy.get('@secondTodo')
        .find('.edit')
        .clear()
        .type('    buy some sausages    ')
        .type('{enter}')

      allItems().eq(0).should('contain', TODO_ITEM_ONE)
      cy.get('@secondTodo').should('contain', 'buy some sausages')
      allItems().eq(2).should('contain', TODO_ITEM_THREE)
    })

    it('should remove the item if an empty text string was entered', function () {
      allItems().eq(1).as('secondTodo').find('label').dblclick()

      cy.get('@secondTodo').find('.edit').clear().type('{enter}')

      allItems().should('have.length', 2)
    })

    it('should cancel edits on escape', function () {
      allItems().eq(1).as('secondTodo').find('label').dblclick()

      cy.get('@secondTodo').find('.edit').clear().type('foo{esc}')

      allItems().eq(0).should('contain', TODO_ITEM_ONE)
      allItems().eq(1).should('contain', TODO_ITEM_TWO)
      allItems().eq(2).should('contain', TODO_ITEM_THREE)
    })
  })
})
