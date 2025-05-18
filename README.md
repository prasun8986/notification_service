# notification_service

A simple notification microservice built with Node.js, Express, MongoDB, and RabbitMQ.

## Deployed @Render
link:- https://notification-service-9ny4.onrender.com

## Features

- RESTful API to create and fetch users
- Sends notifications via RabbitMQ
- MongoDB integration for data persistence

## Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- RabbitMQ (local or cloud)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/prasun8986/notification_service.git
cd notification_service
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
RABBITMQ_URI=amqp://localhost
```

Replace `your_mongodb_connection_string` with your actual MongoDB URI.

### 4. Start the Server

```bash
node index.js
```

You should see:

```
MongoDB Connected ✅  
✅ Connected to RabbitMQ  
🚀 Server running on port 5000
```

## API Endpoints

### Create a User

**POST** `/api/users`  
**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
```

### Get User by ID

**GET** `/api/users/:id`

### Send Notification

**POST** `/notifications/send`  
**Request Body:**

```json
{
  "userId": "mongodb_user_id",
  "message": "Your notification message"
}
```

## Assumptions

- MongoDB and RabbitMQ are running before starting the service.
- This backend service is intended to be consumed by frontend clients or other backend systems.
- Notifications are handled asynchronously through RabbitMQ queues.

## License

MIT

