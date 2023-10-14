# Crypto Journal Backend

A backend service for the Crypto Journal application, built with Node.js and Express.

## Table of Contents

- [Features](#features)
- [Directory Structure](#directory-structure)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and registration.
- JWT-based authentication.
- PostgreSQL database integration.
- Logging with Winston.
- Configuration management with dotenv.

## Directory Structure

\```
src/
 ├── config/          # Database and JWT configurations
 ├── routes/          # API routes
 ├── models/          # Database models and operations
 ├── utils/           # Utility functions and helpers
 ├── middleware/      # Middlewares for routes
\```

## Setup

1. Clone the repository:

\```bash
git clone https://github.com/your-username/crypto-journal-backend.git
\```

2. Install dependencies:

\```bash
npm install
\```

3. Set up your `.env` file with the necessary configurations:

\```
DB_USER=your_db_user
DB_HOST=your_db_host
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=your_db_port
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=jwt_expiration_time
\```

4. Start the server:

\```bash
npm start
\```

## Usage

- Register a new user:

  `POST /auth/register`

- Login:

  `POST /auth/login`

- Access protected routes:

  `GET /protected`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Frontend WIP...

## License

[MIT](https://choosealicense.com/licenses/mit/)
