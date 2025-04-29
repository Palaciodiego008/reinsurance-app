# Reinsurance App Backend

This is the backend service for the Reinsurance App. It is built using Node.js, Express, and MySQL.

## ✨ Features

- RESTful API for managing reinsurance contracts
- Unit tests implemented with Jest
- Environment variables for database configuration

## 📋 Requirements

- Node.js (v20 or higher)
- MySQL database

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone this repository
   cd reinsurance-app/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=reinsurance_db
   PORT=3000
   ```

## 🏃‍♂️ Running the Backend

To start the backend server, run:

```bash
npm start
```

The backend will run on port 3000 by default.

## 🧪 Running Unit Tests

To execute the unit tests, run:

```bash
npm test
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contracts` | Fetch all contracts |
| POST | `/api/contracts` | Create a new contract |

## 📄 License

MIT