// Describes the TodoMVC model instance.
// Ideally it would come from the application,
// but in our example app does not have types,
// so we write method signatures ourselves.

export interface Todo {
  title: string
  completed: boolean
}

/**
 * Several methods available in the application model object.
 */
interface TodoModel {
  todos: unknown[]
  addTodo(...todos: string[]): void
  toggle(item: unknown): void
  inform(): void
}
// During tests there we set "window.model" property
// now cy.window() returns Window instance with
// the "model" property that has TodoModel interface
interface Window {
  model: TodoModel
}
