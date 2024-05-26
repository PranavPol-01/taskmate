# TaskMate

TaskMate is a task management application that helps users manage their tasks with priorities and deadlines. Users can receive email reminders and notifications for tasks nearing their deadlines.

## Deploy link
https://taskmate-myszpf9vs-pranav-pols-projects.vercel.app

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Demo Video](#demo-video)
- [Contributing](#contributing)


## Overview

TaskMate is built with a React frontend and a Node.js/Express backend. It uses MongoDB as the database and nodemailer for sending email reminders. The application is designed to be deployed on platforms like Render for the backend and Vercel for the frontend.

## Features

- User authentication (sign up, log in)
- Task creation, update, and deletion
- Task prioritization (high, medium, low)
- Email reminders for tasks ending soon
- In-app notifications
- Dashboard for overview of tasks
- Responsive design

## Installation

### Prerequisites

- Node.js
- npm
- MongoDB

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/PranavPol-01/taskmate.git
    cd taskmate/server
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `server` directory and add the following environment variables:

    ```env
    NODE_ENV=development
    PORT=8800
    MONGO_URI=your_mongodb_uri
    EMAIL=your_email@example.com
    PASS=your_email_password
    ```

4. Start the backend server:

    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ../client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm start
    ```

## Usage

1. Register a new account or log in with an existing account.
2. Create, update, or delete tasks.
3. Set task priorities and deadlines.
4. Receive email reminders for tasks ending soon.

## API Endpoints

### User Routes

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Log in a user

### Task Routes

- `GET /api/tasks` - Get all tasks for the logged-in user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Notification Routes

- `GET /api/notifications` - Get all notifications for the logged-in user
- `DELETE /api/notifications/:id` - Delete a notification

## Screenshots

### Home Page
![tm](https://github.com/PranavPol-01/taskmate/assets/138373185/e50509ac-7c57-46b3-9ba3-5c9fe65bcb27)

![homepage](https://github.com/PranavPol-01/taskmate/assets/138373185/f5c893ba-859a-48c9-9e62-cd7bd9abc4b5)


### Task List

![tasklist](https://github.com/PranavPol-01/taskmate/assets/138373185/a31225b2-6aff-43ba-9152-71f76dea415a)


### Task Details

![taskdetails](https://github.com/PranavPol-01/taskmate/assets/138373185/db3a75ef-a0b2-4b08-a6e3-e4137dc0b1c0)


### Dashboard


![dashboard](https://github.com/PranavPol-01/taskmate/assets/138373185/a2dcdb8d-83ea-45d3-89a8-f249ad389f8d)


## Demo Video

[Watch the demo video]

https://github.com/PranavPol-01/taskmate/assets/138373185/5f4c7e0a-8a73-499a-9881-2bc30eb5df94

(https://youtu.be/wPQqJtToZm4)

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.


