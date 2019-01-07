/// <reference types="cypress" />

export class TodoPage {
  static TODO_ITEM_ONE = 'buy some cheese'
  static TODO_ITEM_TWO = 'feed the cat'
  static TODO_ITEM_THREE = 'book a doctors appointment'

  visit () {
    cy.visit('/')
  }

  createTodos () {
    cy.get('.new-todo', { log: false })
      .type(`${TodoPage.TODO_ITEM_ONE}{enter}`, { log: false })
      .type(`${TodoPage.TODO_ITEM_TWO}{enter}`, { log: false })
      .type(`${TodoPage.TODO_ITEM_THREE}{enter}`, { log: false })

    cy.log('TodoPage: created todos')

    return cy.get('.todo-list li', { log: false })
  }
}

export const todoPage = new TodoPage()
