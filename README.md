# Multifunction APP

A full-stack web application designed as a multifunction platform for **AI-assisted conversations, file management, task/background-process monitoring, and supporting utilities**.

The project is split into two applications:

- **Backend** — Laravel API responsible for authentication, GraphQL API, file management, conversation management, and AI integration.
- **Frontend** — Vue 3 + Vite single-page application that provides the user interface for interacting with the backend.

## Project Repositories

- Backend: `Multifunction-APP`
- Frontend: `Multifunction-APP-FR`

The backend is built with Laravel and PostgreSQL, while the frontend is built with Vue 3 and Vite.

## Main Purpose

Multifunction APP is being developed as a personal/general-purpose web platform that brings several commonly used capabilities into one application.

The current architecture focuses on:

- User authentication using JWT
- GraphQL-based application API
- AI conversation management
- AI message streaming using Server-Sent Events (SSE)
- File upload and file management
- Task and background-process management
- A Vue-based responsive frontend
- API communication between the frontend and Laravel backend

The application is designed so that features that work well with GraphQL are exposed through GraphQL, while use cases that require streaming or binary responses remain available through dedicated REST endpoints.

## Architecture

```text
┌───────────────────────────────┐
│        Vue 3 Frontend         │
│          Vite + SPA            │
└───────────────┬───────────────┘
                │
                │ HTTP / GraphQL / REST + SSE
                ▼
┌───────────────────────────────┐
│       Laravel Backend         │
│                               │
│  ┌─────────────────────────┐  │
│  │ GraphQL / Lighthouse    │  │
│  │                         │  │
│  │ Queries & Mutations     │  │
│  └─────────────────────────┘  │
│                               │
│  ┌─────────────────────────┐  │
│  │ REST API                │  │
│  │                         │  │
│  │ File Download           │  │
│  │ AI Streaming (SSE)      │  │
│  └─────────────────────────┘  │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│          PostgreSQL           │
│                               │
│ Users / Files / Conversations │
│ Tasks / Application Data      │
└───────────────────────────────┘
```

## Backend

The backend repository contains the main application logic and API layer.

### Core technologies

- PHP
- Laravel
- PostgreSQL
- Laravel Lighthouse / GraphQL
- JWT authentication
- Laravel Queue
- Server-Sent Events (SSE)
- Laravel Storage
- Vite / frontend asset tooling

### Authentication

Authentication uses a JWT-based API guard.

The frontend authenticates against the backend and uses the resulting JWT for protected API and GraphQL requests.

Protected backend routes use:

```text
auth:api
```

rather than Laravel's traditional session-based authentication middleware.

## GraphQL API

GraphQL is used as the primary API interface for structured application operations.

Examples of functionality handled through GraphQL include:

- Authentication
- User information
- Conversation listing
- Conversation lookup
- Starting conversations
- Deleting conversations
- File metadata operations
- Other application queries and mutations

The GraphQL endpoint is provided by Laravel Lighthouse.

The backend keeps the GraphQL schema and resolvers/mutators organized separately from the traditional REST controllers.

## REST + SSE Endpoints

Not every operation is suitable for a standard GraphQL response.

Two important cases remain implemented as REST endpoints:

### File downloads

Downloading a file requires a binary/streamed HTTP response, so it remains outside normal GraphQL responses.

### AI message streaming

AI responses can be streamed token-by-token to the frontend using **Server-Sent Events (SSE)**.

This allows the UI to display the AI response progressively instead of waiting for the complete response.

Conceptually:

```text
Frontend
   │
   │ POST / AI message
   ▼
Laravel API
   │
   │ AI provider
   ▼
AI Response Stream
   │
   │ SSE
   ▼
Frontend
   │
   └── Display tokens progressively
```

## File Management

The application includes a file management system.

Users can:

- Upload files
- Associate files with their account
- Store file metadata
- Store files using Laravel's filesystem
- Delete uploaded files
- Download files through a dedicated endpoint

Uploaded files are associated with the authenticated user, allowing the backend to enforce ownership when accessing or deleting files.

Typical file metadata includes:

```text
id
user_id
name
path
size
mime_type
timestamps
```

## AI Conversation System

The application includes an AI conversation layer designed to manage conversations between users and an AI service.

The backend is responsible for:

- Creating conversations
- Retrieving conversations
- Managing conversation data
- Sending AI messages
- Streaming AI responses
- Connecting the application to an external AI provider

The architecture is intended to keep the frontend independent from the underlying AI provider.

This makes it possible to change or add AI providers without requiring major changes to the frontend application.

## Frontend

The frontend is a Vue 3 single-page application.

### Technologies

- Vue 3
- Vite
- JavaScript
- HTML / CSS
- GraphQL API integration
- REST API integration
- SSE for AI streaming

The frontend repository contains:

```text
src/
public/
index.html
vite.config.js
package.json
```

The frontend is responsible for the user-facing interface while the Laravel application provides the backend services.

## Development Structure

The project is separated into two repositories:

```text
Multifunction-APP/
└── Laravel Backend

Multifunction-APP-FR/
└── Vue 3 Frontend
```

This separation allows the frontend and backend to be developed and deployed independently.

## Deployment

The backend is designed to run on a Linux server environment with services such as:

- Ubuntu Server
- Nginx
- PHP-FPM
- PostgreSQL
- GitHub Actions
- Cloudflare Tunnel
- Tailscale

The exact infrastructure may change depending on the deployment environment.

## Development Workflow

The project uses Git-based development.

The backend currently follows a branching concept similar to:

```text
on-dev-*  →  staging  →  main
```

Where:

- `on-dev-*` — feature development
- `staging` — integration and testing
- `main` — stable/production branch

The frontend repository can be developed independently and connected to the appropriate backend API environment.

## Environment Configuration

Environment-specific values should not be committed to Git.

Create a local `.env` file based on the project's environment example when available.

Typical configuration may include:

```env
APP_URL=
APP_ENV=
APP_KEY=

DB_CONNECTION=pgsql
DB_HOST=
DB_PORT=5432
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

JWT_SECRET=

VITE_API_URL=
```

Never commit real credentials, API keys, JWT secrets, database passwords, or other sensitive values.

## Local Development

### Frontend

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the frontend:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Backend

Install PHP dependencies:

```bash
composer install
```

Prepare the environment:

```bash
cp .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

Configure PostgreSQL and other environment variables in `.env`.

Run migrations:

```bash
php artisan migrate
```

Start the Laravel development server:

```bash
php artisan serve
```

Additional services such as queue workers may be required depending on the enabled features.

## Project Status

This project is under active development.

Features and architecture may change as new functionality is introduced.

The current development direction is focused on building a modular platform where:

- Laravel acts as the backend/API layer
- GraphQL handles structured application operations
- REST handles operations requiring binary or streaming responses
- Vue provides the frontend interface
- External AI services provide AI capabilities
- PostgreSQL stores application data

## Security Notes

Do not commit:

- `.env`
- API keys
- JWT secrets
- Database passwords
- Private certificates
- Server credentials
- Cloudflare/Tailscale credentials

Use environment variables for secrets and keep production credentials outside the repository.

## License

This project is currently maintained as a personal/private development project. No open-source license has been defined unless explicitly added to the repository.
