# IBM Employee Management Frontend

Standalone Angular 21 Employee Management System for the Spring Boot `employee-service`.

## Stack

- Angular 21 standalone components
- TypeScript strict mode
- Angular Signals
- Reactive Forms
- Angular Router
- Functional guards and interceptors
- Typed HttpClient
- RxJS
- Plain CSS

## Backend

The frontend calls the backend at:

```text
http://localhost:8082
```

Auth endpoint:

```text
POST /api/v1/auth/token
```

Employee endpoints:

```text
/api/v1/employees
```

## Run

```bash
npm install
npm start
```

Open:

```text
http://localhost:4200
```

## Login

The login page uses the demo token endpoint.

Default values:

- Username: `admin`
- Roles: `ROLE_ADMIN`

The JWT is stored in `localStorage` and attached to Employee API calls as:

```http
Authorization: Bearer <token>
```

## Verification

```bash
npm run build
npm run test -- --watch=false
```

Angular local cache is disabled in `angular.json` because the current local Node/esbuild combination produced an esbuild service deadlock with the persistent cache enabled. Build and test run cleanly with cache disabled.
