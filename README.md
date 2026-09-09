# DB Learning

Full-stack web application developed as a final degree project for learning database concepts with interactive exercises, AI-assisted explanations and user progress tracking.

## Overview

DB Learning is an educational platform focused on helping students practise database fundamentals. The application combines a React frontend, an Express REST API, MySQL persistence and OpenAI integration for assisted learning features.

The project includes:

- User authentication with JWT.
- User registration and login.
- AI-powered consultation assistant.
- AI-generated quizzes.
- User profile management.
- Query history.
- Test result history.
- Admin user management.
- MySQL database schema.

## Repository structure

```txt
TFG/
├── database/
│   └── dblearning.sql
├── expressAPI/
│   ├── api.js
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── config/
│       ├── middleware/
│       ├── modules/
│       │   ├── ai/
│       │   ├── auth/
│       │   ├── conversations/
│       │   ├── marks/
│       │   └── users/
│       ├── shared/
│       └── utils/
└── reactapp/
    ├── public/
    └── src/
        ├── components/
        ├── routes/
        ├── utils/
        ├── views/
        └── styles/
```

## Frontend

The frontend is built with React and React Router. The application is organized around route-level screens, shared components and reusable infrastructure.

### Frontend improvements

- Centralized authentication helpers.
- Protected route component to avoid repeating guard logic in `App.js`.
- Guest route component for login/register flows.
- Responsive global layout rules.
- Safer token decoding and role verification.
- Testing utilities for auth logic and app smoke rendering.

## Backend

The backend has been refactored from a single large Express file into a modular architecture based on application factory, configuration, middleware and feature modules.

### Backend architecture

- `api.js`: small entry point that creates the app and starts the server.
- `src/app.js`: application factory where dependencies are wired.
- `src/config/`: environment, MySQL pool and OpenAI client configuration.
- `src/middleware/`: authentication, role guards and centralized error handling.
- `src/shared/`: reusable helpers such as `AppError` and async controller wrapper.
- `src/utils/`: validation helpers.
- `src/modules/`: domain-oriented backend modules.

### API modules

- `auth`: registration and login.
- `users`: profile data, profile updates and admin user management.
- `ai`: AI assistant and quiz generation.
- `conversations`: saved AI consultations and user query history.
- `marks`: saved test results and user score history.

### API responsibilities

- Auth: `/register`, `/login`.
- AI assistant: `/sendqueryIA`, `/saveConversation`, `/userConsults`.
- AI tests: `/generateTest`, `/saveMark`, `/userMarks`.
- User profile: `/userData`, `/editUsername`, `/editPassword`.
- Admin: `/users`, `/deleteUser`, `/editUser`.
- Health check: `/health`.

## Testing

The project includes a first testing layer focused on critical pure logic and backend domain services.

### Frontend tests

- Authentication/token helper tests.
- Application smoke test with mocked external dependencies.

### Backend tests

- Validation helpers.
- User module business rules.
- AI service behavior with mocked OpenAI client.
- Marks module payload normalization and validation.

## Environment variables

Create a `.env` file inside `expressAPI/`:

```env
PORT=3060
SECRET_KEY=your-secret-key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=dblearning
DB_PORT=3306
OPENAI_API_KEY=your-openai-api-key
```

## Running locally

### API

```bash
cd expressAPI
npm install
npm start
```

### Frontend

```bash
cd reactapp
npm install
npm start
```

## Quality checks

### Frontend

```bash
cd reactapp
npm test -- --watchAll=false
npm run build
```

### Backend

```bash
cd expressAPI
npm test
```

## Roadmap

- Continue improving the UI with a consistent design system.
- Replace duplicated form logic with reusable hooks.
- Add loading, empty and error states consistently.
- Add API route integration tests with mocked MySQL and OpenAI clients.
- Add E2E tests for the main user flows.
- Improve accessibility and responsive behavior across all screens.
- Add deployment documentation for frontend and backend.

## Tech stack

- React
- React Router
- Material UI
- Axios
- Express
- MySQL
- JWT
- bcrypt
- OpenAI API
- Jest / React Testing Library
- Node test runner
