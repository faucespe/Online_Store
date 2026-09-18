# StoreCustomerSite

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.21.

the content of the StoreCustomerSite is two pages:

Products - on this main page, customers can view cards with all the products that were created in the Admin Website and stored in the SQL database. On this page, the customer is able to see all products as presentation cards. if the customer clicks a product, they will be able to see a modal with additional informacion about the product. This page also allows adding products to the Shopping Cart.

Shoppingg Cart - this is a section where customers can check all the products they added on the Products Page. It also shows the total number of products and the grand total for them. When the customer is ready to complete the purchase, the shopping cart will display a form where the customer needs to enter their information in order to create a record of the purchase in the database 

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
