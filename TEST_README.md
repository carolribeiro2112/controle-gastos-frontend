# Controle de Gastos - Frontend

A React-based expense tracking application with JWT authentication and comprehensive test coverage.

## Features

- 🔐 **JWT Authentication** - Secure login and registration system
- 👥 **Role-based Access** - Users assigned roles based on age (16+ = Admin, <16 = User)
- 🛡️ **Protected Routes** - Dashboard access restricted to authenticated users
- 🧪 **Comprehensive Testing** - Unit tests for all components and services
- 🎨 **Modern UI** - Built with Radix UI components and TypeScript

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI Components**: Radix UI
- **HTTP Client**: Axios
- **Routing**: React Router
- **Testing**: Vitest, Testing Library
- **State Management**: React hooks (useState, useEffect)

## Getting Started

### Prerequisites

- Node.js (18+ recommended)
- Yarn or npm
- Backend API running on `http://localhost:8080`

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd controle-gastos-frontend

# Install dependencies
yarn install

# Start development server
yarn dev
```

### Available Scripts

```bash
# Development
yarn dev                 # Start development server

# Building
yarn build              # Build for production
yarn preview            # Preview production build

# Testing
yarn test               # Run tests in watch mode
yarn test:run           # Run tests once
yarn test:ui            # Run tests with UI
yarn test:coverage      # Run tests with coverage report

# Linting
yarn lint               # Check code style
```

## Testing

This project includes comprehensive unit tests covering:

### Services

- **LoginService**: Authentication, token management, error handling
- **RegisterService**: User registration, validation, error scenarios

### Components

- **Login**: Form validation, authentication flow, navigation
- **Register**: Age-based role assignment, form validation, error handling
- **Dashboard**: Authentication checking, logout functionality
- **ProtectedRoute**: Route protection, authentication redirects
- **PublicRoute**: Redirect authenticated users from login/register

### Test Coverage

The test suite includes:

- ✅ **42 total tests** with excellent coverage
- ✅ **Component rendering** and user interactions
- ✅ **Form validation** and error states
- ✅ **Authentication flows** and token management
- ✅ **Route protection** and navigation
- ✅ **Error handling** for network and API errors
- ✅ **Loading states** and async operations

### Running Tests

```bash
# Run all tests
yarn test:run

# Run tests with coverage
yarn test:coverage

# Run tests with UI
yarn test:ui

# Run specific test file
yarn test LoginService.test.ts
```

## Authentication System

### Login Flow

1. User enters credentials
2. JWT token received and stored in localStorage
3. Token added to axios headers for API requests
4. User redirected to dashboard

### Registration Flow

1. User enters username, age, password
2. Role automatically assigned based on age:
   - Age ≥ 16: `ADMIN` role
   - Age < 16: `USER` role
3. Account created and success toast shown
4. User redirected to login page

### Route Protection

- **Public Routes** (`/`, `/register`): Redirect authenticated users to dashboard
- **Protected Routes** (`/dashboard`): Redirect unauthenticated users to login

## Project Structure

```
src/
├── components/           # Reusable components
│   ├── ProtectedRoute/  # Route protection wrapper (with co-located tests)
│   ├── PublicRoute/     # Public route wrapper (with co-located tests)
│   └── Toast/           # Success notifications
├── pages/               # Page components
│   ├── Login/          # Login form (with co-located tests)
│   ├── Register/       # Registration form (with co-located tests)
│   └── Dashboard/      # Protected dashboard (with co-located tests)
├── services/           # API services
│   ├── LoginService.ts # Authentication service (with co-located tests)
│   └── RegisterService.ts # Registration service (with co-located tests)
├── Api/                # Axios configuration
└── types/              # TypeScript type definitions
```

## API Integration

The frontend communicates with a Spring Boot backend:

- **POST** `/auth/login` - User authentication
- **POST** `/auth/register` - User registration

All API calls include proper error handling and loading states.

## Development Notes

### State Management

- Local state with React hooks (useState, useEffect)
- JWT token persistence in localStorage
- Global axios configuration for authentication headers

### Error Handling

- Comprehensive error boundaries
- User-friendly error messages
- Network error detection and handling

### Type Safety

- Full TypeScript coverage
- Strict type checking
- Interface definitions for all API responses

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

This project is licensed under the MIT License.
