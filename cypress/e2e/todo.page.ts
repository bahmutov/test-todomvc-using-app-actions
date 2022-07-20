// Page object for working with the page UI
export class TodoPage {
  static TODO_ITEM_ONE = 'buy some cheese'
  static TODO_ITEM_TWO = 'feed the cat'
  static TODO_ITEM_THREE = 'book a doctors appointment'

  visit() {
    cy.visit('/')
  }

  createTodos() {
    cy.get('.new-todo', { log: false })
      .type(`${TodoPage.TODO_ITEM_ONE}{enter}`, { log: false })
      .type(`${TodoPage.TODO_ITEM_TWO}{enter}`, { log: false })
      .type(`${TodoPage.TODO_ITEM_THREE}{enter}`, { log: false })

    cy.log('TodoPage: created todos')

    cy.get('.todo-list li', { log: false }).as('todos')
  }

  /**
   * @param {string} todo
   */
  createTodo(todo: string) {
    cy.get('.new-todo', { log: false }).type(`${todo}{enter}`, { log: false })
    cy.log(`Created todo "${todo}"`)
    return cy
      .get('.todo-list', { log: false })
      .contains('li', todo.trim(), { log: false })
  }

  /**
   * @param {number} k Index of the todo to toggle
   */
  toggle(k: number) {
    cy.get('.todo-list li', { log: false }).eq(k).find('.toggle').check()
  }

  /**
   * Returns either all todo items on the page,
   * or just a given one (zero index)
   */
  todos(k?: number) {
    if (k !== undefined) {
      return cy.get('.todo-list li').eq(k)
    }

    return cy.get('.todo-list li')
  }

  /**
   * @param {string} label to find
   */
  filter(label: string) {
    cy.get('.filters').contains(label).click()
  }

  clearCompleted() {
    cy.get('.clear-completed').click()
  }
}

export const todoPage = new TodoPage()
