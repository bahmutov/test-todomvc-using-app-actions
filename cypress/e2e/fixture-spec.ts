import type { Todo } from './model'

it('adds todos following the fixture', () => {
  cy.visit('/')
  cy.fixture<{ todos: Todo[] }>('todos.json')
    .its('todos')
    .should('be.an', 'array')
    .then((todos) => {
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
