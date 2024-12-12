# **FixU Cloud Computing**

**Fixu Cloud Computing** is a Node.js application built with Express, MySQL, Firebase, and other robust dependencies to deliver comprehensive cloud computing services. Designed for cloud-based environments, the application provides features like authentication, database management, and API handling.

---

## **Features**

- **Express**: A backend server framework for handling requests and routing.
- **MySQL2**: MySQL database management for efficient data storage and retrieval.
- **Firebase Admin SDK**: Seamless Firebase integration for authentication and data handling.
- **JWT Authentication**: Secure user authentication using JSON Web Tokens.
- **Axios**: Simplifies HTTP requests for API communication.
- **dotenv**: Loads environment variables for easier configuration management.
- **Cloud Storage**: A reliable storage solution for saving images, supporting the quotes feature with seamless integration and accessibility.

---

## **Installation**

To set up the project locally, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/fixu-cloud-computing.git
```

### 2. Navigate to the Project Directory
```bash
cd fixu-cloud-computing
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory and add the following configuration:

```plaintext
DATABASE_HOST=your-database-host
DATABASE_USER=your-database-user
DATABASE_PASSWORD=your-database-password
DB_NAME=your-database-name
JWT_SECRET=your-jwt-secret
STUDENT_PREDICT_URL=your-url-model-student
PROFESSIONAL_PREDICT_URL=your-url-model-professional
BUCKET_NAME=your-bucket-name
```

### 5. Start the Application
**Development Mode** (with hot reloading):
  ```bash
  npm run start-dev
  ```
**Production Mode**:
  ```bash
  npm start
  ```

---

## **Available Scripts**

- **`npm start`**: Starts the application in production mode.
- **`npm run start-dev`**: Starts the application in development mode with hot reloading using **nodemon**.
- **`npm test`**: Placeholder for running tests (to be implemented).

---

## **Dependencies**

### Core Dependencies
| Dependency       | Version  |
|-------------------|----------|
| **axios**         | ^1.7.8   |
| **dotenv**        | ^16.4.5  |
| **express**       | ^4.21.1  |
| **firebase-admin**| ^13.0.1  |
| **jsonwebtoken**  | ^9.0.2   |
| **mysql2**        | ^3.11.4  |
| **cloud storage** | ^7.14.0  |

### Development Dependencies
| Dependency       | Version  |
|-------------------|----------|
| **@eslint/js**    | ^9.15.0  |
| **eslint**        | ^9.15.0  |
| **globals**       | ^15.12.0 |
| **nodemon**       | ^3.1.7   |

---
