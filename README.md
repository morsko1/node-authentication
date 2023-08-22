# Node Express JWT Authentication Example

This is an example project showcasing JWT authentication using Google account.
Implemented using Node.js, Express, PostgreSQL, Prisma and JWT.

Here is the repo with authentication client - [authentication-client-react](https://github.com/morsko1/authentication-client-react)


## Prerequisites
Before running the project, ensure you have the following prerequisites installed on your system:

- Node.js (version 14 or higher)
- PostgreSQL

Create a PostgreSQL database.
Setup env variables. Check [.env.example](.env.example)


## Local development

Follow the steps below to set up and run the project:

1. Clone the repository:
    ```
    git clone <repository_url>
    ```

2. Navigate to the project directory:
    ```
    cd node-authentication
    ```

3. Install dependencies:
    ```
    npm i
    ```

4. Generate the Prisma client:
    ```
    npx prisma generate
    ```

5. Run database migrations:
    ```
    npx prisma migrate dev
    ```

5. Run database migrations:
    ```
    npx prisma migrate dev
    ```

6. Run server:
    ```
    npm run dev
    ```

## Usage

The following endpoints are available:

- `POST /auth/login/google` - Login user. Creates new user in DB if doesn't exist. Requires providing Google id token in Authorization header. Set refresh token in cookie, sends access token in response body.
- `POST /auth/verify` - Verifies access token. Requires providing access token in the Authorization header.
- `POST /auth/refresh` - Sends new access token in response body. Requires providing refresh token in cookies.
- `POST /auth/logout` - Logout, clears auth cookies.
- `GET /ping` - Public route.
- `GET /data` - Get protected data. Requires a valid JWT access token in the Authorization header.
