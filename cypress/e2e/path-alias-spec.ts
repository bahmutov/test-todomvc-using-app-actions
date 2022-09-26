import type { Todo } from '@src/Todo'

describe('Source path alias', () => {
  it('checks the application todos', () => {
    cy.visit('/')
    cy.get('.new-todo')
      .type('one{enter}')
      .type('two{enter}')
      .type('three{enter}')
    cy.window()
      .its('model.todos')
      .should('have.length', 3)
      .then((todos: Todo[]) => {
        todos.forEach((todo) => {
          // each todo has id which is an uuid
          expect(todo).to.have.property('id').and.to.be.a('string')
        })
      })
  })
})
