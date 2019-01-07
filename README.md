# test-todomvc-using-app-actions

> Example Cypress tests going from page objects to app actions

Read blog post [Stop using Page Objects and Start using App Actions](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/)

## Steps

Each step is a Git tag. You can check out particular tag, install dependencies and run application and tests. Usually it would be:

```shell
git checkout <tag>
npm install
npm start
# from another terminal
npm run cypress
```

1. `00-start` just TodoMVC application running at `localhost:8888`
2. `01-first-test` adds Cypress and first end-to-end test in [spec.js](cypress/integration/spec.js)
3. `02-tests` brings a lot of tests from [cypress-example-todomvc](https://github.com/cypress-io/cypress-example-todomvc) to [spec.js](cypress/integration/spec.js). All tests work through UI (page), sometimes using custom commands defined in [cypress/support/commands.js](cypress/support/commands.js)
4. `03-page-object` drives app via page object [todo.page.js](cypress/integration/todo.page.js)
5. `04-app-actions` controls application by mostly directly calling the [model instance](js/todoModel.js) directly to avoid always going through the page.

## Tests

All tests are in folder [cypress/integration](cypress/integration). Common test settings are in [cypress.json](cypress.json) file.
