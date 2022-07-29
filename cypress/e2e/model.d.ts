// Describes the TodoMVC model instance.
// Ideally it would come from the application,
// but in our example app does not have types,
// so we write method signatures ourselves.

export type Todo = {
  title: string
  completed: boolean
}

// From out app actions we only use a couple of methods.
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
