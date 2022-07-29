import type { Todo } from './model'

describe('Use JSON fixture', () => {
  it('adds todos following the fixture', () => {
    cy.visit('/')
    cy.fixture('todos.json')
      .its('todos')
      .should('be.an', 'array')
      .then((todos: Todo[]) => {
        todos.forEach((todo, k) => {
          cy.get('input.new-todo').type(todo.title + '{enter}')
          cy.get('.todo-list li').should('have.length', k + 1)
          if (todo.completed) {
            cy.get('.todo-list li').last().find('.toggle').click()
            cy.get('.todo-list li').last().should('have.class', 'completed')
          }
        })
      })
  })
})
