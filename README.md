# Some ~~Kitchenware~~ CRUD App (Nodejs/React)
This app is a simple Create Read Update Delete (CRUD) single-page application. 
The intention is to demonstrate my capacity to acquire and exercise literacy/ability with a React/Nodejs-Express stack.

## Noteworthy Features
### (DevOps):
 - Docker containers (nodejs-backend/postgres-db) for local development
 - Dockerfile (nodejs-backend) for eventual deployment to production using AWS ECS
 - Source control using Git/GitHub (YOU ARE HERE)
 - Vite for managing frontend transpilation and hosting on localhost

### (Nodejs Backend API):
 - Express Framework
 - MVC Architecture (Model/ViewController)
 - POSTGRES SQL DATABASE
 - ORM (Object Relational Mapping) with typeorm
 - Typescript
 - Dependency Injection with tsyringe

### (React Frontend - Single Page Application):
 - React
 - Material UI
 - Theme selection (light/dark - persist with localStorage)
 - State Management with React Context API/Hooks API
 - React Router (manage client-side routes)
 - Form tracking and validation with react-hook-form
 - Components -> AppBar, SideNav Drawer, Main View Pane, Modal, Table, Cards (...)
 - API service using fetch for http requests

## Link to Live Demo
TODO: Deploy to either AWS ECS or GCP Cloud Run
The only way to run a demo right now is to clone the repo and follow the instructions for local development.

## Setup for local development
### Prerequisites
 - Must have Docker installed
 - Uses Node.js v22.17.0 (nvm recommended to manage node versions)
 - Must have git installed

1. Clone the repo (run the following command in your projects directory)
`git clone https://github.com/attributeofextension/kitchenware_nodejs_express_crud.git`
2. Run `docker compose build` in root directory
3. Run `docker compose up` in root directory
4. In a new terminal window, run `docker exec -it nodejs sh` to run commands on the nodejs container
5. Run `npm run migration:run` (nodejs api should now be ready and accessible on localhost:3000)
6. In a new terminal window, navigate to <YOUR_PROJECT>/react/app and run `npm install`
7. Run `npm run dev` (react app should now be ready and accessible on localhost:5173)

## Thanks for stopping by!