# Smart Web BTQ

Welcome to Smart Web BTQ, a web application designed to provide a seamless experience for users. This project is built using a combination of Express.js for the backend and React for the frontend.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Node.js (>=14.x)
- npm (>=6.x) or yarn (>=1.x)

### Backend Setup

1. Navigate to the backend directory:
    ```sh
    cd backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the backend directory and add the necessary environment variables (see [Environment Variables](#environment-variables)).

4. Start the backend server:
    ```sh
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the frontend development server:
    ```sh
    npm start
    ```

## Usage

Once both the backend and frontend servers are running, you can access the application by navigating to `http://localhost:3000` in your web browser.

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Users

- `GET /api/users` - Get user data
- `PUT /api/users` - Update user data

### Surah
- `GET /api/surah` - Get list of surah

### Recordings
- `GET /api/recordings` - Get recordings history
- `POST /api/recordings` - Submit recording


## Environment Variables

Create a `.env` file in the backend directory and add the following variables:

PORT=5000 
CLOUD_MONGO_URI=your_cloud_mongodb_connection_string
LOCAL_MONGO_URI=your_local_mongodb_connection_string 
JWT_SECRET=your_jwt_secret

