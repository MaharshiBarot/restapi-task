# REST API Documentation

## Overview
This REST API allows for managing groups and members within a system. It provides endpoints to add and remove members from groups, create and delete groups, and check a member's subscription status. The API interacts with a relational database (PostgreSQL/MySQL) and follows best practices for security, validation, and error handling.

## Tech Stack
- **Backend Framework:** Node.js (Express) / FastAPI / Django REST Framework
- **Database:** PostgreSQL
- **ORM:** Sequelize / SQLAlchemy / Django ORM
- **Authentication:** JWT-based authentication
- **Security:** Input validation, authentication, and authorization

## API Endpoints

### 1. Add Member to Group
**Endpoint:** `POST /group/member/add`

**Request Body:**
```json
{
  "member_id": "string",
  "group_id": "string"
}
```

**Response:**
```json
{
  "message": "Member added successfully",
  "group_id": "string",
  "member_id": "string"
}
```

### 2. Remove Member from Group
**Endpoint:** `DELETE /group/member/remove`

**Request Body:**
```json
{
  "member_id": "string",
  "group_id": "string"
}
```

**Response:**
```json
{
  "message": "Member removed successfully"
}
```

### 3. Add Group
**Endpoint:** `POST /group/add`

**Request Body:**
```json
{
  "group_name": "string"
}
```

**Response:**
```json
{
  "message": "Group created successfully",
  "group_id": "string"
}
```

### 4. Remove Group
**Endpoint:** `DELETE /group/remove`

**Request Body:**
```json
{
  "group_id": "string"
}
```

**Response:**
```json
{
  "message": "Group removed successfully"
}
```

### 5. Check Subscription Status
**Endpoint:** `GET /member/subscription/{member_id}`

**Response:**
```json
{
  "member_id": "string",
  "subscribed_groups": [
    {
      "group_id": "string",
      "group_name": "string"
    }
  ]
}
```

## Database Schema

### Group Table
| Column      | Type        | Constraints |
|------------|------------|-------------|
| id         | UUID       | Primary Key |
| name       | String     | Unique, Not Null |
| created_at | Timestamp  | Auto-generated |

### Member Table
| Column      | Type        | Constraints |
|------------|------------|-------------|
| id         | UUID       | Primary Key |
| name       | String     | Not Null |
| email      | String     | Unique, Not Null |

### Group_Members Table (Join Table)
| Column      | Type        | Constraints |
|------------|------------|-------------|
| member_id  | UUID       | Foreign Key (Member Table) |
| group_id   | UUID       | Foreign Key (Group Table) |
| joined_at  | Timestamp  | Auto-generated |

## Authentication & Security
- **JWT-based Authentication:** All endpoints require authentication via a JWT token.
- **Input Validation:** Middleware will validate request data before processing.
- **Error Handling:** Structured error responses with proper HTTP status codes.

## Error Handling

| Status Code | Description |
|------------|-------------|
| 400        | Bad Request (Validation Error) |
| 401        | Unauthorized (Invalid Token) |
| 403        | Forbidden (Access Denied) |
| 404        | Not Found (Resource Not Available) |
| 500        | Internal Server Error |

## Setup & Installation
1. Clone the repository:
   git clone https://github.com/MaharshiBarot/restapi-task.git
   
2. Navigate to the project folder:
   cd project-folder

3. Install dependencies:
   npm install  # For Node.js
   pip install -r requirements.txt  # For Python

4. Set up environment variables (`.env` file):
   DB_NAME=rest_api_db
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_HOST=localhost
   JWT_SECRET=your_jwt_secret

5. Run the server:

   npm start  # For Node.js
   uvicorn main:app --reload  # For FastAPI
   python manage.py runserver  # For Django

## Conclusion
This API provides essential group management functionality with a secure and scalable architecture. Future enhancements could include role-based access control, email notifications, and logging mechanisms.

