echo "# Fixu Cloud Computing

This is a Node.js application built with Express, MySQL, Firebase, and other dependencies to provide cloud computing services. It is designed to be used in a cloud-based environment and implements features such as authentication, database management, and API handling.

## Features

- **Express**: Backend server framework for handling requests and routing.
- **MySQL2**: Database management with MySQL.
- **Firebase Admin SDK**: Firebase integration for handling authentication and data.
- **JWT Authentication**: Secure authentication using JSON Web Tokens.
- **Axios**: For making HTTP requests.
- **dotenv**: Loads environment variables for configuration management.
  
## Installation

Follow these steps to get the project up and running:

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/fixu-cloud-computing.git
   \`\`\`

2. Navigate into the project directory:
   \`\`\`bash
   cd fixu-cloud-computing
   \`\`\`

3. Install the dependencies:
   \`\`\`bash
   npm install
   \`\`\`

4. Create a \`.env\` file to configure your environment variables. Example:
   \`\`\`bash
   DATABASE_HOST=your-database-host
   DATABASE_USER=your-database-user
   DATABASE_PASSWORD=your-database-password
   FIREBASE_CONFIG=your-firebase-config
   JWT_SECRET=your-jwt-secret
   \`\`\`

5. Start the application:
   - In development mode (with hot reloading):
     \`\`\`bash
     npm run dev
     \`\`\`
   - In production mode:
     \`\`\`bash
     npm start
     \`\`\`

## Available Scripts

- \`npm start\`: Starts the application in production mode.
- \`npm run dev\`: Starts the application in development mode using nodemon (auto-restarts on file changes).
- \`npm test\`: Placeholder for running tests (currently not implemented).

## Dependencies

- **axios**: ^1.7.8
- **dotenv**: ^16.4.5
- **express**: ^4.21.1
- **firebase-admin**: ^13.0.1
- **jsonwebtoken**: ^9.0.2
- **mysql2**: ^3.11.4

### Development Dependencies

- **@eslint/js**: ^9.15.0
- **eslint**: ^9.15.0
- **globals**: ^15.12.0
- **nodemon**: ^3.1.7
