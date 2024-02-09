# Ride Evee Backend Assignment

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Jest

## Documentation
- [API Documentation](https://documenter.getpostman.com/view/26894077/2s9YyzdxoW)

## Local Setup

To run this application locally, follow the steps below:

1. Clone the repository:

   ```bash
   git clone https://github.com/Akashdeep-k/nodejs-api
   cd nodejs-api
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Insert the environment variables in `config/dev.example.env` file and rename it to `config/dev.env`:

   ```bash
   MONGODB_URI=<your-mongodb-uri>
   ACCESS_TOKEN_SECRET=<your-access-token-secret>
   REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
   ```

   Also, insert the environment variables in `config/test.example.env` file and rename it to `config/test.env`:

   ```bash
   MONGODB_URI=<your-mongodb-uri>
   ACCESS_TOKEN_SECRET=<your-access-token-secret>
   REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
   ```

   Replace `<your-mongodb-uri>` with your MongoDB URI.

4. Run the application:

   ```bash
   npm start
   ```

   or

   ```bash
   npm run test
   ```

   to run test cases.

5. The application will start on port 3000.

## Docker Setup

To run this application using Docker, follow the steps below:

1. Repeat the first three steps of the local setup.

2. Build the Docker image:

   ```bash
   docker build -t nodejs-api .
   ```

3. Run the Docker container:

   ```bash
   docker run -d -p 3000:3000 nodejs-api
   ```

4. The application will start on port 3000.

# API Routes

### Users

- **GET** `/api/v1/users/:userId` - Get user by ID
- **GET** `/api/v1/users` - Get all users
- **POST** `/api/v1/users` - Create a new user
- **PUT** `/api/v1/users/me` - Update user
- **DELETE** `/api/v1/users/me` - Delete user