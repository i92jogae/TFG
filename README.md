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
│   ├── api.js                # Original API entry point
│   └── src/                  # Refactored API architecture
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

The frontend is built with React and React Router. The application is organized around pages/views and reusable infrastructure:

- `views/`: route-level screens.
- `components/`: shared UI components.
- `routes/`: routing helpers such as protected routes.
- `utils/`: reusable logic, for example token handling.
- `styles/`: global responsive styles.

### Frontend improvements

The project has been modernized progressively to improve maintainability and public presentation:

- Centralized authentication helpers.
- Protected route component to avoid repeating guard logic in `App.js`.
- Responsive global layout rules.
- Safer token decoding and role verification.
- Testing utilities for auth logic.

## Backend

The backend is an Express API connected to MySQL. It handles authentication, user data, AI consultations, test generation, saved conversations, saved marks and admin operations.

### API responsibilities

- Auth: `/register`, `/login`.
- AI assistant: `/sendqueryIA`, `/saveConversation`, `/userConsults`.
- AI tests: `/generateTest`, `/saveMark`, `/userMarks`.
- User profile: `/userData`, `/editUsername`, `/editPassword`.
- Admin: `/users`, `/deleteUser`, `/editUser`.

### Backend modernization goals

The original API was implemented in a single file. A cleaner architecture separates responsibilities into configuration, middleware, utilities, services and routes. This makes the code easier to test, maintain and extend.

Recommended target structure:

```txt
expressAPI/src/
├── app.js
├── server.js
├── config/
├── middleware/
├── routes/
├── services/
└── utils/
```

## Testing

The project includes a first testing layer focused on critical pure logic:

- Authentication/token helper tests in the frontend.
- API validation/helper tests in the backend.

Recommended next testing steps:

- Component tests for login/register forms.
- Integration tests for protected routes.
- API route tests with mocked database queries.
- E2E tests for the main user flows.

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

- Complete API modularization by moving every endpoint from `api.js` to route/controller/service layers.
- Add full integration tests with mocked MySQL and OpenAI clients.
- Improve all views with a consistent design system.
- Replace duplicated form logic with reusable hooks.
- Add loading, empty and error states consistently.
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
