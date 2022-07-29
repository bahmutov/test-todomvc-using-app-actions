import type { Todo } from './model'
import { todos } from '../fixtures/todos.json'

const initialTodos: Todo[] = todos

describe('Import JSON fixture', () => {
  it('adds todos following the fixture', () => {
    cy.visit('/')
    initialTodos.forEach((todo, k) => {
      cy.get('input.new-todo').type(todo.title + '{enter}')
      cy.get('.todo-list li').should('have.length', k + 1)
      if (todo.completed) {
        cy.get('.todo-list li').last().find('.toggle').click()
        cy.get('.todo-list li').last().should('have.class', 'completed')
      }
    })
  })
})
