# deliver-ease

The project is a Nest.js web application aimed at practicing **Test-Driven Development (TDD)** principles. 

It provides functionalities for user sign-up, order placement, payments, and retrieval of order history. 
The application includes an alarm system to notify users of order status changes, allows users to leave reviews within a specific time, and supports bookmarking of favorite stores. Store owners can manage orders and update their status. 

The primary goal is to practice TDD methodologies by writing tests before implementing the corresponding functionality, ensuring reliable and maintainable code.


## Features

- User can sign up and sign in.
- User can place orders.
- User can make payments within the app.
- User can retrieve the order list from three months ago.
- Alarm system for order status changes.
- User can leave reviews 1 hour to 24 hours after successful delivery.
- User can bookmark favorite stores.
- Store owners can manage orders.

## Technologies Used

- [Nest.js](https://nestjs.com) - A progressive Node.js framework for building efficient and scalable server-side applications.
- MySql - MySql allows us to establish relationships between tables using a relational DBMS, which helps prevent duplication of tables or fields and enables me to build CRUD operations.

## Installation

```bash
$ npm install
```

## Set up the database.
```
```

## Configure environment variables.
```
```

## Start the server.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

