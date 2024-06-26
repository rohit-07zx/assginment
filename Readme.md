# Node.js MVC Project

This is a simple Node.js project following the MVC (Model-View-Controller) architecture. The project demonstrates a basic CRUD (Create, Read, Update, Delete) application for managing users.

## Project Structure

src/
│
├── controllers/
│ └── userController.js
|
├── db/
│ └── db.js
|
├── middleware/
│ └── auth.middleware.js
|
├── models/
│ └── user.model.js
│
├── routes/
│ └── user.routes.js
|
├── services/
│ └── userService.js
| └── api.response.js
| └──asynchandler.js
|
├── utils/
│ └── api.error.js
│
├── validators/
│ └── user.validation.js
│
├── app.js
├── main.js
test/
├── userController.spec.js
└── userService.spec.js

### Installation

1. Clone the repository:

```bash
git clone https://github.com/rohit-07zx/assginment.git
```

2.  env-example to .env

3.  COMMANDS

## npm i

## npm run dev

4. FOR TEST

## npm test

## Authentication

This project uses JWT (JSON Web Tokens) for authentication. The following endpoints are used for authentication:

## POST /worko/user/login: Login a user and get a JWT token

## User Endpoints

# GET /worko/user/loadUsers: Load initial user data

# GET /worko/user/: Get all users (requires authentication)

# GET /worko/user/:id: Get a user by ID (requires authentication)

# POST /worko/user: Create a new user

# PUT /worko/user/:id: Update a user by ID (requires authentication)

# DELETE /worko/user/:id: Delete a user by ID (requires authentication)

# GET /worko/user/loadUsers Load initial users..
