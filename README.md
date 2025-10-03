# Nest GraphQL + MongoDB + React (Vite + Apollo)

This project contains:
- Backend: NestJS GraphQL API backed by MongoDB (Mongoose)
- Frontend: React (Vite) with Apollo Client for a simple end‑user UI
  - Users page with Create, List, Inline Edit, Delete
  - Get User by ID form

## Directory structure
- Backend/ — NestJS app (GraphQL at /graphql)
- Frontend/ — React + Vite app (Apollo Client UI)

## Prerequisites
- Node.js and npm
- A MongoDB URI (Atlas or local)

## Quick start
1) Start the Backend (in a terminal)
   - Set environment variables and run the dev server. 
     ```
     $env:MONGO_URI = "mongodb://localhost:27017/your_db_name"
     $env:PORT = "3000"  # optional
     npm --prefix "C:\Users\HP\Desktop\Edviron\nest\nest-graphql-mongo\Backend" run start:dev
     ```
   - GraphQL Playground: http://localhost:3000/graphql

2) Start the Frontend (in another terminal)
   - Development server:
     ```
     npm --prefix "C:\Users\HP\Desktop\Edviron\nest\nest-graphql-mongo\Frontend" install
     npm --prefix "C:\Users\HP\Desktop\Edviron\nest\nest-graphql-mongo\Frontend" run dev
     ```
   - Open the URL shown by Vite (default http://localhost:5173)

## Backend details
- Entry: `Backend/src/main.ts`
  - CORS is enabled for development so the React app can call the API from another origin.
- GraphQL setup: `Backend/src/app.module.ts`
  - Auto-generates schema at `src/schema.gql`
  - Playground and introspection are enabled
- User module: `Backend/src/user/*`
  - Queries:
    - `getAllUsers: [User!]!`
    - `getUser(id: String!): User`
  - Mutations:
    - `createUser(input: CreateUserInput!): User`
    - `updateUser(input: UpdateUserInput!): User`
    - `removeUser(id: String!): Boolean` (returns true on success)

Environment variables
- Required: `MONGO_URI`
- Optional: `PORT` (defaults to 3000)

Example to run backend with environment variables:
```
$env:MONGO_URI = "mongodb://localhost:27017/your_db_name"
$env:PORT = "3000"
npm --prefix "C:\Users\HP\Desktop\Edviron\nest\nest-graphql-mongo\Backend" run start:dev
```

## Frontend details (React + Vite + Apollo)
- Path: `Frontend/`
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview built app: `npm run preview`

Configure the GraphQL endpoint
- Defaults to `http://localhost:3000/graphql`
- Override via Vite env var in `Frontend/.env.local`:
  ```
  VITE_GRAPHQL_ENDPOINT=http://localhost:3000/graphql
  ```
- Restart `npm run dev` after changing environment variables.

Features in the UI
- Create User: form with `name`, `email`, `userRole`
- List Users: table shows `_id`, `name`, `email`, `userRole`
- Inline Edit: modify values in the table row and click Save
- Delete: remove a user by clicking Delete
- Get User by ID: enter an `_id` and fetch details

## Example GraphQL operations
- Get all users
  ```graphql path=null start=null
  query GetAllUsers {
    getAllUsers {
      _id
      name
      email
      userRole
    }
  }
  ```

- Get a user by ID
  ```graphql path=null start=null
  query GetUser($id: String!) {
    getUser(id: $id) {
      _id
      name
      email
      userRole
    }
  }
  ```

- Create a user
  ```graphql path=null start=null
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      _id
      name
      email
      userRole
    }
  }
  # Variables
  # {
  #   "input": { "name": "Jane", "email": "jane@example.com", "userRole": "User" }
  # }
  ```

- Update a user
  ```graphql path=null start=null
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      _id
      name
      email
      userRole
    }
  }
  # Variables
  # {
  #   "input": { "_id": "<id>", "name": "Jane D" }
  # }
  ```

- Remove a user
  ```graphql path=null start=null
  mutation RemoveUser($id: String!) {
    removeUser(id: $id)
  }
  ```

## Troubleshooting
- CORS errors
  - Ensure the backend was restarted after enabling CORS in `Backend/src/main.ts`.
  - Verify the frontend origin (http://localhost:5173) is allowed; the dev config uses permissive CORS for development.
- 404/Network errors
  - Check `VITE_GRAPHQL_ENDPOINT` and that the backend is running on the expected port.
- MongoDB connection errors
  - Verify `MONGO_URI` and network access to your database.

## Scripts reference
- Install frontend deps:
  ```
  npm --prefix "C:\Users\HP\Desktop\Edviron\nest\nest-graphql-mongo\Frontend" install
  ```
- Run frontend dev server:
  ```
  npm --prefix "C:\Users\HP\Desktop\Edviron\nest\nest-graphql-mongo\Frontend" run dev
  ```
- Build frontend:
  ```
  npm --prefix "C:\Users\HP\Desktop\Edviron\nest\nest-graphql-mongo\Frontend" run build
  ```
- Preview frontend build:
  ```
  npm --prefix "C:\Users\HP\Desktop\Edviron\nest\nest-graphql-mongo\Frontend" run preview
  ```
- Run backend (dev):
  ```
  $env:MONGO_URI = "mongodb://localhost:27017/your_db_name"
  npm --prefix "C:\Users\HP\Desktop\Edviron\nest\nest-graphql-mongo\Backend" run start:dev
  ```
