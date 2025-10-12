# 🚀 API Gateway - Complete API Documentation

## 🚀 **Quick API Reference - All Available Endpoints**

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| `GET` | `/` | ❌ No | Health check - API status verification |
| `POST` | `/v1/auth/signup` | ❌ No | Create new user account |
| `POST` | `/v1/auth/login` | ❌ No | Authenticate user & get JWT token |
| `GET` | `/v1/auth/profile` | ✅ Yes | Get current user's profile |
| `PUT` | `/v1/auth/profile` | ✅ Yes | Update current user's profile |
| `GET` | `/v1/auth/users` | ✅ Yes | Get paginated users list with search & role filter |
| `POST` | `/v1/auth/users` | ✅ Yes | Create new user (admin) |
| `GET` | `/v1/auth/users/:id` | ✅ Yes | Get user by ID |
| `PUT` | `/v1/auth/users/:id` | ✅ Yes | Update user by ID (admin) |
| `DELETE` | `/v1/auth/users/:id` | ✅ Yes | Delete user by ID (admin) |
| `GET` | `/v1/auth/users/role/:roleId` | ✅ Yes | Get users by role |
| `POST` | `/v1/questions` | ✅ Yes | Create new question |
| `GET` | `/v1/questions` | ✅ Yes | Get paginated questions with search & filters |
| `GET` | `/v1/questions/:id` | ✅ Yes | Get question by ID |
| `PUT` | `/v1/questions/:id` | ✅ Yes | Update question |
| `DELETE` | `/v1/questions/:id` | ✅ Yes | Delete question |
| `GET` | `/v1/questions/category/:category` | ✅ Yes | Get questions by category |
| `GET` | `/v1/questions/level/:level` | ✅ Yes | Get questions by level |
| `GET` | `/v1/questions/stats` | ✅ Yes | Get question statistics |
| `GET` | `/v1/questions/categories` | ✅ Yes | Get available categories |
| `GET` | `/v1/questions/levels` | ✅ Yes | Get available levels |
| `POST` | `/v1/categories` | ✅ Yes | Create new category |
| `GET` | `/v1/categories` | ✅ Yes | Get paginated categories with search & filters |
| `GET` | `/v1/categories/:id` | ✅ Yes | Get category by ID |
| `PUT` | `/v1/categories/:id` | ✅ Yes | Update category |
| `DELETE` | `/v1/categories/:id` | ✅ Yes | Delete category |
| `GET` | `/v1/categories/active` | ✅ Yes | Get active categories |
| `GET` | `/v1/categories/with-counts` | ✅ Yes | Get categories with question counts |
| `PATCH` | `/v1/categories/:id/toggle-status` | ✅ Yes | Toggle category active status |
| `PUT` | `/v1/categories/sort-order` | ✅ Yes | Update category sort order |
| `POST` | `/v1/roles` | ✅ Yes | Create new role |
| `GET` | `/v1/roles` | ✅ Yes | Get paginated roles with search & filters |
| `GET` | `/v1/roles/:id` | ✅ Yes | Get role by ID |
| `PUT` | `/v1/roles/:id` | ✅ Yes | Update role |
| `DELETE` | `/v1/roles/:id` | ✅ Yes | Delete role |
| `GET` | `/v1/roles/with-counts` | ✅ Yes | Get roles with user counts |
| `GET` | `/v1/roles/const/:roleConst` | ✅ Yes | Get role by constant |
| `PUT` | `/v1/roles/bulk-update` | ✅ Yes | Bulk update roles |
| `POST` | `/v1/visits` | ❌ No | Record a new visit (public endpoint) |
| `GET` | `/v1/visits` | ✅ Yes | Get paginated visits with filters |
| `GET` | `/v1/visits/:id` | ✅ Yes | Get visit by ID |
| `GET` | `/v1/visits/statistics` | ✅ Yes | Get visit statistics and analytics |
| `GET` | `/v1/visits/unique-visitors` | ✅ Yes | Get unique visitors count |
| `GET` | `/v1/visits/by-country` | ✅ Yes | Get visits grouped by country |
| `GET` | `/v1/visits/by-device-type` | ✅ Yes | Get visits grouped by device type |
| `GET` | `/v1/visits/by-source-system` | ✅ Yes | Get visits grouped by source system |
| `GET` | `/v1/visits/source/:sourceSystem` | ✅ Yes | Get visits from specific source system |
| `GET` | `/v1/visits/ip/:ipAddress` | ✅ Yes | Get visits by IP address |
| `GET` | `/v1/visits/session/:sessionId` | ✅ Yes | Get visits by session ID |
| `DELETE` | `/v1/visits/:id` | ✅ Yes | Delete visit by ID |
| `POST` | `/v1/visits/bulk-delete` | ✅ Yes | Bulk delete visits by criteria |

### **🔑 Authentication Details:**
- **Public Endpoints:** Health check, Signup, Login, Record Visit
- **Protected Endpoints:** Profile management, Users list, Visit analytics
- **Auth Method:** JWT Bearer token in `Authorization` header
- **Token Format:** `Authorization: Bearer <your_jwt_token>`

### **📊 Response Format:**
- **Success:** `{"success": true, "message": "...", "data": {...}}`
- **Error:** `{"success": false, "message": "Error description"}`
- **Status Codes:** 200 (Success), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 500 (Server Error)

---

## 📋 Table of Contents
- [Overview](#overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [API Endpoints](#api-endpoints)
  - [Health Check](#health-check)
  - [Authentication APIs](#authentication-apis)
  - [User Management APIs](#user-management-apis)
  - [Questions Management APIs](#questions-management-apis)
  - [Categories Management APIs](#categories-management-apis)
  - [Roles Management APIs](#roles-management-apis)
  - [App Visits Tracking APIs](#app-visits-tracking-apis)

---

## 🌟 Overview
This API Gateway provides a comprehensive set of endpoints for user authentication, profile management, user administration, questions management, categories management, roles management, and application/website visit tracking. Built with Node.js, Express, and MongoDB, it offers secure, scalable, and RESTful APIs.

**Version:** v1  
**Environment:** Production  
**Database:** MongoDB Atlas (Workspace Database)

---

## 🔗 Base URL
```
Local Development: http://localhost:3000
Production: [Your Railway Domain]
```

---

## 🔐 Authentication
The API uses **JWT (JSON Web Tokens)** for authentication. Protected endpoints require a valid token in the request header.

### Token Format
```
Authorization: Bearer <your_jwt_token>
```

### Getting a Token
1. Use the `/v1/auth/signup` endpoint to create an account
2. Use the `/v1/auth/login` endpoint to authenticate and receive a token
3. Include the token in subsequent requests to protected endpoints

---

## ❌ Error Handling
All API responses follow a consistent error format:

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information (optional)"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

---

## 🚦 Rate Limiting
- **Window:** 15 minutes
- **Max Requests:** 100 requests per window
- **Headers:** Rate limit information is included in response headers

---

## 📡 API Endpoints

---

### 🏥 Health Check

#### GET `/`
**Description:** Health check endpoint to verify API status

**Authentication:** Not required

**Request:**
```http
GET /
```

**Response:**
```json
{
  "success": true,
  "message": "API Gateway is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0"
}
```

---

### 🔐 Authentication APIs

#### POST `/v1/auth/signup`
**Description:** Create a new user account

**Authentication:** Not required

**Request Headers:**
```http
Content-Type: application/json
```

**Request Body:**
```json
{
  "fullName": "John Doe",
  "mobile": "1234567890",
  "password": "securePassword123",
  "roleId": "507f1f77bcf86cd799439011"
}
```

**Field Validation:**
- `fullName`: Required, string, 2-100 characters
- `mobile`: Required, string, 10-15 characters, unique
- `password`: Required, string, minimum 6 characters
- `roleId`: Optional, string, valid MongoDB ObjectId (24 characters)

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": {
      "_id": "65c1234567890abcdef12345",
      "fullName": "John Doe",
      "mobile": "1234567890",
      "roleId": {
        "_id": "507f1f77bcf86cd799439011",
        "roleConst": "ADMIN"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": "Mobile number already exists"
}
```

---

#### POST `/v1/auth/login`
**Description:** Authenticate user and receive access token

**Authentication:** Not required

**Request Headers:**
```http
Content-Type: application/json
```

**Request Body:**
```json
{
  "mobile": "1234567890",
  "password": "securePassword123"
}
```

**Field Validation:**
- `mobile`: Required, string
- `password`: Required, string

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "65c1234567890abcdef12345",
      "fullName": "John Doe",
      "mobile": "1234567890",
      "roleId": {
        "_id": "507f1f77bcf86cd799439011",
        "roleConst": "ADMIN"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 👤 User Management APIs

#### GET `/v1/auth/profile`
**Description:** Get current user's profile information

**Authentication:** Required (JWT Token)

**Request Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request:**
```http
GET /v1/auth/profile
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "user": {
      "_id": "65c1234567890abcdef12345",
      "fullName": "John Doe",
      "mobile": "1234567890",
      "roleId": {
        "_id": "507f1f77bcf86cd799439011",
        "roleConst": "ADMIN"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Access token is required"
}
```

---

#### PUT `/v1/auth/profile`
**Description:** Update current user's profile information

**Authentication:** Required (JWT Token)

**Request Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "fullName": "John Smith",
  "mobile": "0987654321",
  "password": "newpassword123",
  "roleId": "507f1f77bcf86cd799439011"
}
```

**Field Validation:**
- `fullName`: Optional, string, 2-100 characters
- `mobile`: Optional, string, 10-15 characters, unique
- `password`: Optional, string, minimum 6 characters
- `roleId`: Optional, string, valid MongoDB ObjectId (24 characters)

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "_id": "65c1234567890abcdef12345",
      "fullName": "John Smith",
      "mobile": "0987654321",
      "roleId": {
        "_id": "507f1f77bcf86cd799439011",
        "roleConst": "ADMIN"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:45:00.000Z"
    }
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Mobile number already exists"
}
```

---

#### GET `/v1/auth/users`
**Description:** Get paginated list of users with optional search

**Authentication:** Required (JWT Token)

**Request Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**
- `page` (optional): Page number, default: 1
- `limit` (optional): Items per page, default: 10, max: 100
- `search` (optional): Search term for fullName or mobile
- `roleId` (optional): Filter users by role ID
- `sortBy` (optional): Sort field - `fullName`, `mobile`, `createdAt`, `updatedAt` (default: `createdAt`)
- `sortOrder` (optional): Sort order - `asc`, `desc` (default: `desc`)

**Request Examples:**
```http
GET /v1/auth/users
GET /v1/auth/users?page=1&limit=20
GET /v1/auth/users?search=john
GET /v1/auth/users?page=2&limit=5&search=123
GET /v1/auth/users?roleId=507f1f77bcf86cd799439011
GET /v1/auth/users?sortBy=fullName&sortOrder=asc
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": {
    "users": [
      {
        "_id": "65c1234567890abcdef12345",
        "fullName": "John Doe",
        "mobile": "1234567890",
        "roleId": {
          "_id": "507f1f77bcf86cd799439011",
          "roleConst": "ADMIN"
        },
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      },
      {
        "_id": "65c1234567890abcdef12346",
        "fullName": "Jane Smith",
        "mobile": "0987654321",
        "roleId": null,
        "createdAt": "2024-01-15T11:00:00.000Z",
        "updatedAt": "2024-01-15T11:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalUsers": 50,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Access token is required"
}
```

---

#### 🆕 **POST** `/v1/auth/users`
**Create a new user (admin function)**

**Authentication:** Required (JWT Token)

**Request Body:**
```json
{
  "fullName": "New User",
  "mobile": "9876543210",
  "password": "password123",
  "roleId": "507f1f77bcf86cd799439011"
}
```

**Field Validation:**
- `fullName`: Required, string, 2-100 characters
- `mobile`: Required, string, 10-15 characters, unique
- `password`: Required, string, minimum 6 characters
- `roleId`: Optional, string, valid MongoDB ObjectId (24 characters)

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": {
      "_id": "65c1234567890abcdef12347",
      "fullName": "New User",
      "mobile": "9876543210",
      "roleId": {
        "_id": "507f1f77bcf86cd799439011",
        "roleConst": "ADMIN"
      },
      "createdAt": "2024-01-15T12:00:00.000Z",
      "updatedAt": "2024-01-15T12:00:00.000Z"
    }
  }
}
```

---

#### 🔍 **GET** `/v1/auth/users/:id`
**Get user by ID**

**Authentication:** Required (JWT Token)

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "user": {
      "_id": "65c1234567890abcdef12345",
      "fullName": "John Doe",
      "mobile": "1234567890",
      "roleId": {
        "_id": "507f1f77bcf86cd799439011",
        "roleConst": "ADMIN"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

---

#### ✏️ **PUT** `/v1/auth/users/:id`
**Update user by ID (admin function)**

**Authentication:** Required (JWT Token)

**Request Body:**
```json
{
  "fullName": "Updated Name",
  "mobile": "1111111111",
  "password": "newpassword123",
  "roleId": "507f1f77bcf86cd799439012"
}
```

**Field Validation:**
- `fullName`: Optional, string, 2-100 characters
- `mobile`: Optional, string, 10-15 characters, unique
- `password`: Optional, string, minimum 6 characters
- `roleId`: Optional, string, valid MongoDB ObjectId (24 characters)

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "user": {
      "_id": "65c1234567890abcdef12345",
      "fullName": "Updated Name",
      "mobile": "1111111111",
      "roleId": {
        "_id": "507f1f77bcf86cd799439012",
        "roleConst": "USER"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T12:30:00.000Z"
    }
  }
}
```

---

#### 🗑️ **DELETE** `/v1/auth/users/:id`
**Delete user by ID (admin function)**

**Authentication:** Required (JWT Token)

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {
    "id": "65c1234567890abcdef12345"
  }
}
```

**Note:** Cannot delete your own account.

---

#### 👥 **GET** `/v1/auth/users/role/:roleId`
**Get users by role**

**Authentication:** Required (JWT Token)

**Query Parameters:**
- `page` (optional): Page number, default: 1
- `limit` (optional): Items per page, default: 10, max: 100
- `search` (optional): Search term for fullName or mobile
- `sortBy` (optional): Sort field - `fullName`, `mobile`, `createdAt`, `updatedAt` (default: `createdAt`)
- `sortOrder` (optional): Sort order - `asc`, `desc` (default: `desc`)

**Request Examples:**
```http
GET /v1/auth/users/role/507f1f77bcf86cd799439011
GET /v1/auth/users/role/507f1f77bcf86cd799439011?page=1&limit=20
GET /v1/auth/users/role/507f1f77bcf86cd799439011?search=john
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": {
    "users": [
      {
        "_id": "65c1234567890abcdef12345",
        "fullName": "John Doe",
        "mobile": "1234567890",
        "roleId": {
          "_id": "507f1f77bcf86cd799439011",
          "roleConst": "ADMIN"
        },
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "role": {
      "_id": "507f1f77bcf86cd799439011",
      "roleConst": "ADMIN"
    },
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalUsers": 1,
      "hasNextPage": false,
      "hasPrevPage": false,
      "limit": 10
    }
  }
}
```

---

## 📊 App Visits Tracking APIs

### 📍 **POST** `/v1/visits`
**Record a new application/website visit**

**Authentication:** ❌ Not required (Public endpoint)

**Description:** This endpoint **automatically extracts all visitor information** from the HTTP request. Simply call the endpoint with no payload required! The API will capture:
- IP address from request headers
- User agent and parse it for browser/OS/device info
- Referrer from headers
- Page URL from request
- Location data (if provided by proxy/CDN like Cloudflare)
- And more...

**How to Use:**

**Required Payload** - Must include sourceSystemConst:
```json
{
  "sourceSystemConst": "MY_WEBSITE"
}
```

**With Optional Data** - Add session ID and metadata:
```json
{
  "sourceSystemConst": "MY_WEBSITE",
  "sessionId": "sess_abc123xyz",
  "userId": "65c1234567890abcdef12345",
  "metadata": {
    "campaign": "spring_sale",
    "source": "email"
  }
}
```

**With Optional Headers:**
```http
POST /v1/visits
Content-Type: application/json
X-Session-Id: sess_abc123xyz
X-User-Id: 65c1234567890abcdef12345

{
  "sourceSystemConst": "MY_WEBSITE"
}
```

**Auto-Extracted Information:**
- ✅ **Device IP Address**: From `X-Forwarded-For`, `X-Real-IP`, or socket
- ✅ **User Agent**: From `User-Agent` header
- ✅ **Browser Info**: Name and version (Chrome, Firefox, Safari, Edge, Opera)
- ✅ **OS Info**: Name and version (Windows, macOS, Linux, Android, iOS)
- ✅ **Device Type**: mobile, tablet, desktop, or other
- ✅ **Device Info**: Vendor and model (Apple, Samsung, etc.)
- ✅ **Referrer**: From `Referer` or `Referrer` header
- ✅ **Page URL**: Constructed from request protocol, host, and path
- ✅ **Location**: Country, city, region, timezone (if proxy provides headers)
- ✅ **Timestamp**: Current server time
- ✅ **Session ID**: From `X-Session-Id` header or cookies
- ✅ **User ID**: From `X-User-Id` header or authenticated user

**Request Body Fields:**
- `sourceSystemConst`: **REQUIRED**, string, max 50 characters, uppercase (e.g., `MY_WEBSITE`, `MOBILE_APP`, `ADMIN_PANEL`)
- `deviceIPAddress`: Optional, string, max 45 characters (auto-extracted if not provided)
- `deviceName`: Optional, string, max 200 characters  
- `sessionId`: Optional, string, max 100 characters
- `userId`: Optional, valid MongoDB ObjectId
- `metadata`: Optional, object for custom tracking data
- `message`: Optional, string, max 1000 characters (for error tracking)

**Note:** All fields except `sourceSystemConst` will be auto-extracted from the request if not provided.

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Visit recorded successfully",
  "data": {
    "visit": {
      "_id": "65c1234567890abcdef12345",
      "sourceSystemConst": "MY_WEBSITE",
      "deviceIPAddress": "192.168.1.100",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...",
      "browser": {
        "name": "Chrome",
        "version": "120.0"
      },
      "os": {
        "name": "macOS",
        "version": "14.2"
      },
      "device": {
        "type": "desktop",
        "model": "Mac",
        "vendor": "Apple"
      },
      "deviceLocation": null,
      "referrer": "https://google.com",
      "pageUrl": "http://localhost:3000/v1/visits",
      "timestamp": "2024-01-15T10:30:00.000Z",
      "message": "Success",
      "metadata": {
        "acceptLanguage": "en-US,en;q=0.9",
        "method": "POST"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

**Response with Errors (Still saves - 200):**
```json
{
  "success": true,
  "message": "Visit recorded successfully",
  "data": {
    "visit": {
      "_id": "65c1234567890abcdef12346",
      "sourceSystemConst": "MY_WEBSITE",
      "deviceIPAddress": "192.168.1.100",
      "message": "Error parsing device location",
      "timestamp": "2024-01-15T10:30:00.000Z",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

**Response (Validation Error - 400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "sourceSystemConst",
      "message": "Source system constant is required"
    }
  ]
}
```

**Note:** The API **always returns 200 OK** after successfully saving the visit. If any errors occur during data extraction or processing, they are saved in the `message` field. If the visit is successful, `message` is set to `"Success"`.

---

### 📋 **GET** `/v1/visits`
**Get paginated list of visits with filters**

**Authentication:** ✅ Required (JWT Token)

**Query Parameters:**
- `page`: Optional, number, default: 1
- `limit`: Optional, number, default: 10, max: 100
- `search`: Optional, string, searches IP, device name, page URL
- `sourceSystemConst`: Optional, filter by source system (e.g., `MY_WEBSITE`)
- `deviceIPAddress`: Optional, filter by specific IP
- `country`: Optional, filter by country
- `city`: Optional, filter by city
- `deviceType`: Optional, enum: 'mobile', 'tablet', 'desktop', 'other'
- `sessionId`: Optional, filter by session ID
- `userId`: Optional, filter by user ID
- `startDate`: Optional, date filter (start)
- `endDate`: Optional, date filter (end)
- `sortBy`: Optional, field to sort by (default: 'timestamp')
- `sortOrder`: Optional, 'asc' or 'desc' (default: 'desc')

**Request Examples:**
```http
GET /v1/visits
GET /v1/visits?page=1&limit=20
GET /v1/visits?sourceSystemConst=MY_WEBSITE
GET /v1/visits?deviceType=mobile
GET /v1/visits?country=United%20States&city=New%20York
GET /v1/visits?startDate=2024-01-01&endDate=2024-01-31
GET /v1/visits?sessionId=sess_abc123xyz
GET /v1/visits?sourceSystemConst=MOBILE_APP&deviceType=mobile
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Visits retrieved successfully",
  "data": {
    "visits": [
      {
        "_id": "65c1234567890abcdef12345",
        "deviceIPAddress": "192.168.1.100",
        "deviceName": "John's MacBook Pro",
        "deviceLocation": {
          "country": "United States",
          "city": "New York"
        },
        "device": {
          "type": "desktop"
        },
        "pageUrl": "https://myapp.com/home",
        "timestamp": "2024-01-15T10:30:00.000Z",
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalVisits": 50,
      "limit": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

### 📊 **GET** `/v1/visits/statistics`
**Get comprehensive visit statistics and analytics**

**Authentication:** ✅ Required (JWT Token)

**Query Parameters:**
- `startDate`: Optional, filter statistics by start date
- `endDate`: Optional, filter statistics by end date

**Request Examples:**
```http
GET /v1/visits/statistics
GET /v1/visits/statistics?startDate=2024-01-01&endDate=2024-01-31
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Statistics retrieved successfully",
  "data": {
    "statistics": {
      "totalVisits": 1250,
      "uniqueVisitors": 450,
      "topCountries": [
        { "_id": "United States", "count": 500 },
        { "_id": "United Kingdom", "count": 200 },
        { "_id": "Canada", "count": 150 }
      ],
      "deviceTypes": [
        { "_id": "desktop", "count": 700 },
        { "_id": "mobile", "count": 450 },
        { "_id": "tablet", "count": 100 }
      ],
      "topBrowsers": [
        { "_id": "Chrome", "count": 800 },
        { "_id": "Safari", "count": 300 },
        { "_id": "Firefox", "count": 150 }
      ],
      "topOS": [
        { "_id": "Windows", "count": 600 },
        { "_id": "macOS", "count": 400 },
        { "_id": "iOS", "count": 250 }
      ]
    }
  }
}
```

---

### 👥 **GET** `/v1/visits/unique-visitors`
**Get unique visitors count**

**Authentication:** ✅ Required (JWT Token)

**Query Parameters:**
- `startDate`: Optional, filter by start date
- `endDate`: Optional, filter by end date

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Unique visitors count retrieved successfully",
  "data": {
    "uniqueVisitors": 450,
    "dateRange": {
      "startDate": "2024-01-01T00:00:00.000Z",
      "endDate": "2024-01-31T23:59:59.000Z"
    }
  }
}
```

---

### 🌍 **GET** `/v1/visits/by-country`
**Get visits grouped by country**

**Authentication:** ✅ Required (JWT Token)

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Visits by country retrieved successfully",
  "data": {
    "data": [
      { "_id": "United States", "count": 500 },
      { "_id": "United Kingdom", "count": 200 },
      { "_id": "Canada", "count": 150 }
    ]
  }
}
```

---

### 📱 **GET** `/v1/visits/by-device-type`
**Get visits grouped by device type**

**Authentication:** ✅ Required (JWT Token)

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Visits by device type retrieved successfully",
  "data": {
    "data": [
      { "_id": "desktop", "count": 700 },
      { "_id": "mobile", "count": 450 },
      { "_id": "tablet", "count": 100 }
    ]
  }
}
```

---

### 🏢 **GET** `/v1/visits/by-source-system`
**Get visits grouped by source system**

**Authentication:** ✅ Required (JWT Token)

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Visits by source system retrieved successfully",
  "data": {
    "data": [
      { "_id": "MY_WEBSITE", "count": 1200 },
      { "_id": "MOBILE_APP", "count": 800 },
      { "_id": "ADMIN_PANEL", "count": 300 }
    ]
  }
}
```

---

### 🎯 **GET** `/v1/visits/source/:sourceSystem`
**Get all visits from a specific source system**

**Authentication:** ✅ Required (JWT Token)

**Query Parameters:**
- `page`: Optional, number, default: 1
- `limit`: Optional, number, default: 10

**Request Examples:**
```http
GET /v1/visits/source/MY_WEBSITE
GET /v1/visits/source/MOBILE_APP?page=1&limit=20
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Visits retrieved successfully",
  "data": {
    "sourceSystem": "MY_WEBSITE",
    "visits": [
      {
        "_id": "65c1234567890abcdef12345",
        "sourceSystemConst": "MY_WEBSITE",
        "deviceIPAddress": "192.168.1.100",
        "pageUrl": "https://myapp.com/home",
        "timestamp": "2024-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalVisits": 100,
      "limit": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

### 🔍 **GET** `/v1/visits/ip/:ipAddress`
**Get all visits from a specific IP address**

**Authentication:** ✅ Required (JWT Token)

**Query Parameters:**
- `page`: Optional, number, default: 1
- `limit`: Optional, number, default: 10

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Visits retrieved successfully",
  "data": {
    "ipAddress": "192.168.1.100",
    "visits": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalVisits": 15,
      "limit": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

### 🎯 **GET** `/v1/visits/session/:sessionId`
**Get all visits from a specific session**

**Authentication:** ✅ Required (JWT Token)

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Session visits retrieved successfully",
  "data": {
    "sessionId": "sess_abc123xyz",
    "visits": [...],
    "totalVisits": 5
  }
}
```

---

### 🔍 **GET** `/v1/visits/:id`
**Get visit by ID**

**Authentication:** ✅ Required (JWT Token)

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Visit retrieved successfully",
  "data": {
    "visit": {
      "_id": "65c1234567890abcdef12345",
      "deviceIPAddress": "192.168.1.100",
      "deviceName": "John's MacBook Pro",
      "deviceLocation": {
        "country": "United States",
        "city": "New York",
        "region": "NY"
      },
      "pageUrl": "https://myapp.com/home",
      "timestamp": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

---

### 🗑️ **DELETE** `/v1/visits/:id`
**Delete visit by ID**

**Authentication:** ✅ Required (JWT Token)

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Visit deleted successfully",
  "data": {
    "id": "65c1234567890abcdef12345"
  }
}
```

---

### 🗑️ **POST** `/v1/visits/bulk-delete`
**Bulk delete visits by criteria**

**Authentication:** ✅ Required (JWT Token)

**Request Body:**
```json
{
  "deviceIPAddress": "192.168.1.100",
  "sessionId": "sess_abc123xyz",
  "startDate": "2024-01-01T00:00:00.000Z",
  "endDate": "2024-01-31T23:59:59.000Z"
}
```

**Note:** At least one criteria is required

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Visits deleted successfully",
  "data": {
    "deletedCount": 25
  }
}
```

---

## 🔗 Visit Tracking Integration Guide

### ⚡ **Ultra-Simple Integration (Recommended)**

**The simplest possible integration - just provide your source system identifier!**

```javascript
// Vanilla JavaScript - Just include sourceSystemConst!
fetch('https://your-api-gateway.com/v1/visits', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ sourceSystemConst: 'MY_WEBSITE' })
});
```

That's it! The API **automatically extracts** all other visitor information:
- ✅ IP address, Browser, OS, Device type
- ✅ Referrer, Page URL, Timestamp
- ✅ Location (if behind Cloudflare/CDN)
- ✅ And more!

**Source System Examples:**
- `MY_WEBSITE` - Your main website
- `MOBILE_APP` - Mobile application  
- `ADMIN_PANEL` - Admin dashboard
- `PARTNER_SITE` - Partner integration
- `ECOMMERCE_STORE` - E-commerce platform

### 📱 **Integration Examples**

#### **1. Vanilla JavaScript/HTML**
```html
<script>
  // Track visit on page load
  window.addEventListener('load', () => {
    fetch('https://your-api-gateway.com/v1/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sourceSystemConst: 'MY_WEBSITE' })
    })
      .then(() => console.log('Visit tracked!'))
      .catch(err => console.error('Tracking failed:', err));
  });
</script>
```

#### **2. React**
```jsx
// App.js or Layout component
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Track visit when app loads
    fetch('https://your-api-gateway.com/v1/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sourceSystemConst: 'MY_WEBSITE' })
    });
  }, []);

  return <div>{/* Your app */}</div>;
}
```

#### **3. React with Session & User Tracking**
```jsx
import { useEffect } from 'react';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user } = useAuth();

  useEffect(() => {
    const sessionId = sessionStorage.getItem('session_id') || 
      `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('session_id', sessionId);

    fetch('https://your-api-gateway.com/v1/visits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(user?._id && { 'X-User-Id': user._id })
      },
      body: JSON.stringify({
        sourceSystemConst: 'MY_WEBSITE',
        sessionId,
        metadata: {
          route: window.location.pathname,
          appName: 'MyApp'
        }
      })
    });
  }, [user]);

  return <div>{/* Your app */}</div>;
}
```

#### **4. Vue.js**
```javascript
// main.js or App.vue
export default {
  mounted() {
    fetch('https://your-api-gateway.com/v1/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sourceSystemConst: 'MY_WEBSITE' })
    });
  }
}
```

#### **5. Angular**
```typescript
// app.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  ngOnInit() {
    fetch('https://your-api-gateway.com/v1/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sourceSystemConst: 'MY_WEBSITE' })
    });
  }
}
```

#### **6. Next.js**
```jsx
// _app.js
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    fetch('https://your-api-gateway.com/v1/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sourceSystemConst: 'MY_WEBSITE' })
    });
  }, []);

  return <Component {...pageProps} />;
}
```

#### **7. Plain HTML (Script Tag)**
```html
<!-- Simple script tag approach -->
<script>
  fetch('https://your-api-gateway.com/v1/visits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sourceSystemConst: 'MY_WEBSITE' })
  });
</script>
```

#### **8. Backend/Server-Side (Node.js)**
```javascript
const axios = require('axios');

// Middleware to track API visits
app.use(async (req, res, next) => {
  try {
    await axios.post('https://your-api-gateway.com/v1/visits', {
      sourceSystemConst: 'MY_API_SERVER',
      sessionId: req.session?.id,
      userId: req.user?._id,
      metadata: {
        method: req.method,
        endpoint: req.path,
        apiRequest: true
      }
    });
  } catch (error) {
    // Fail silently
  }
  next();
});
```

#### **9. Mobile - React Native**
```javascript
// App.js
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch('https://your-api-gateway.com/v1/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sourceSystemConst: 'MOBILE_APP',
        metadata: {
          platform: 'mobile',
          appName: 'MyMobileApp'
        }
      })
    });
  }, []);

  return <View>{/* Your app */}</View>;
}
```

#### **10. WordPress (PHP)**
```php
<?php
// functions.php
add_action('wp_footer', function() {
  ?>
  <script>
    fetch('https://your-api-gateway.com/v1/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sourceSystemConst: 'WORDPRESS_SITE' })
    });
  </script>
  <?php
});
```

### 🎯 **Advanced: With Custom Data**

If you want to send additional custom data:

```javascript
fetch('https://your-api-gateway.com/v1/visits', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Session-Id': 'your-session-id',  // Optional
    'X-User-Id': 'user-id-if-logged-in'  // Optional
  },
  body: JSON.stringify({
    sourceSystemConst: 'MY_WEBSITE',  // REQUIRED
    metadata: {
      campaign: 'spring_sale',
      source: 'email',
      customField: 'customValue'
    }
  })
});
```

### 📊 **Viewing Analytics**

After integrating, use these endpoints to view analytics (requires authentication):

```javascript
// Get comprehensive statistics
const stats = await fetch('https://your-api-gateway.com/v1/visits/statistics', {
  headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
});

// Get visits by country
const byCountry = await fetch('https://your-api-gateway.com/v1/visits/by-country', {
  headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
});

// Get all visits with filters
const visits = await fetch('https://your-api-gateway.com/v1/visits?deviceType=mobile&startDate=2024-01-01', {
  headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
});
```

### 💡 **What Gets Auto-Extracted**

When you call `POST /v1/visits` with **NO payload**, the API automatically captures:

| Data Point | Source | Example |
|------------|--------|---------|
| IP Address | Request headers/socket | `192.168.1.100` |
| User Agent | `User-Agent` header | `Mozilla/5.0...` |
| Browser | Parsed from User Agent | `Chrome 120.0` |
| OS | Parsed from User Agent | `Windows 10/11` |
| Device Type | Parsed from User Agent | `desktop` |
| Device Info | Parsed from User Agent | `Apple Mac` |
| Referrer | `Referer` header | `https://google.com` |
| Page URL | Request URL | `https://myapp.com/page` |
| Timestamp | Server time | `2024-01-15T10:30:00Z` |
| Location* | Proxy headers (Cloudflare) | `New York, US` |
| Session ID | `X-Session-Id` or cookies | `sess_abc123` |
| User ID | `X-User-Id` or auth | `65c1234...` |

*Location data available if using Cloudflare or similar proxy that adds geo headers

### 🔒 **Privacy & Best Practices**

1. **Inform Users**: Always notify users about data collection
2. **Comply with Laws**: Follow GDPR, CCPA, and local regulations
3. **Minimal Data**: Only collect what you need
4. **Fail Silently**: Don't let tracking affect user experience
5. **Async Tracking**: Don't block page rendering
6. **Rate Limiting**: Implement client-side throttling if needed

### 🎯 **Error Handling**

The API **always returns 200 OK** and saves the visit. The `message` field indicates success or error:

**Success Case:**
```json
{
  "message": "Success",
  "sourceSystemConst": "MY_WEBSITE",
  "deviceIPAddress": "192.168.1.100",
  // ... other fields
}
```

**Error Case (still saved with 200 OK):**
```json
{
  "message": "Error parsing user agent",
  "sourceSystemConst": "MY_WEBSITE",
  "deviceIPAddress": "192.168.1.100",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**This means:**
- ✅ Your application won't break if tracking fails
- ✅ Every visit is recorded, even with errors
- ✅ You can filter successful visits: `message: "Success"`
- ✅ You can find failed visits: `message: { $ne: "Success" }`
- ✅ Always get 200 OK response (except validation errors)

---

## 🔧 Testing with Postman

### 1. **Setup Collection**
Create a new collection in Postman for your API Gateway

### 2. **Environment Variables**
Set up environment variables:
- `base_url`: `http://localhost:3000` (or your production URL)
- `auth_token`: Leave empty initially

### 3. **Testing Flow**

#### Step 1: Signup
```http
POST {{base_url}}/v1/auth/signup
Content-Type: application/json

{
  "fullName": "Test User",
  "mobile": "1234567890",
  "password": "testpass123"
}
```

#### Step 2: Login
```http
POST {{base_url}}/v1/auth/login
Content-Type: application/json

{
  "mobile": "1234567890",
  "password": "testpass123"
}
```

#### Step 3: Use Token
After login, copy the token from the response and set it in your environment variable `auth_token`

#### Step 4: Test Protected Endpoints
```http
GET {{base_url}}/v1/auth/profile
Authorization: Bearer {{auth_token}}
```

---

## 📝 Notes for API Consumers

### **Password Security**
- Passwords are automatically hashed using bcrypt
- Never store or log passwords in plain text
- Minimum password length: 6 characters

### **Token Management**
- JWT tokens have an expiration time
- Store tokens securely (localStorage, sessionStorage, or secure cookies)
- Include tokens in the `Authorization` header for all protected requests

### **Data Validation**
- All input data is validated using Joi schemas
- Mobile numbers must be unique across the system
- Full names are trimmed and validated for length

### **Pagination**
- Default page size is 10 items
- Maximum page size is 100 items
- Page numbers start from 1
- Search functionality works across fullName and mobile fields

### **Error Responses**
- Always check the `success` field in responses
- Handle different HTTP status codes appropriately
- Display user-friendly error messages from the `message` field

---

## 🚀 Deployment Information

### **Environment Variables Required**
```env
NODE_ENV=production
PORT=3000
WS_MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=*
LOG_LEVEL=info
```

### **Health Check**
The health check endpoint (`/`) should be used by load balancers and monitoring systems to verify API availability.

---

## 📞 Support

For technical support or questions about the API:
- Check the error messages in API responses
- Verify your authentication token is valid
- Ensure all required fields are provided in requests
- Check rate limiting headers for usage information

---

## 📚 Questions Management APIs

### 🆕 **POST** `/v1/questions`
**Description:** Create a new question

**Authentication:** Required (JWT Token)

**Request Headers:**
```http
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "What is the difference between let, const, and var in JavaScript?",
  "answer": "In JavaScript, let, const, and var are different ways to declare variables. var has function scope and can be redeclared and reassigned. let has block scope, can be reassigned but not redeclared. const has block scope and cannot be reassigned or redeclared after initialization.",
  "category": "JavaScript",
  "level": "Beginner"
}
```

**Field Validation:**
- `title`: Required, string, 1-500 characters
- `answer`: Required, string, 1-5000 characters
- `category`: Required, must be one of the predefined categories
- `level`: Required, string (any value, no restrictions)

**Available Categories:**
JavaScript, Python, Java, C++, C#, PHP, Ruby, Go, Rust, Swift, Kotlin, TypeScript, React, Vue, Angular, Node.js, Database, DevOps, System Design, Algorithms, Data Structures, Other

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Question created successfully",
  "data": {
    "_id": "65c1234567890abcdef12345",
    "title": "What is the difference between let, const, and var in JavaScript?",
    "answer": "In JavaScript, let, const, and var are different ways to declare variables...",
    "category": "JavaScript",
    "level": "Beginner",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 📖 **GET** `/v1/questions`
**Description:** Get paginated questions with search, filtering, and sorting

**Authentication:** Required (JWT Token)

**Request Headers:**
```http
Authorization: Bearer <your_jwt_token>
```

**Query Parameters:**
- `page` (optional): Page number, default: 1
- `limit` (optional): Items per page, default: 10, max: 100
- `search` (optional): Search term for title, answer, or category
- `category` (optional): Filter by specific category
- `level` (optional): Filter by specific level
- `sortBy` (optional): Sort field (title, category, level, createdAt, updatedAt), default: createdAt
- `sortOrder` (optional): Sort order (asc, desc), default: desc

**Request Examples:**
```http
GET /v1/questions
GET /v1/questions?page=1&limit=20
GET /v1/questions?search=javascript
GET /v1/questions?category=JavaScript&level=Beginner
GET /v1/questions?sortBy=title&sortOrder=asc
GET /v1/questions?page=2&limit=5&search=react&category=React&level=Intermediate
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Questions retrieved successfully",
  "data": {
    "questions": [
      {
        "_id": "65c1234567890abcdef12345",
        "title": "What is the difference between let, const, and var in JavaScript?",
        "answer": "In JavaScript, let, const, and var are different ways to declare variables...",
        "category": "JavaScript",
        "level": "Beginner",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalQuestions": 50,
      "hasNextPage": true,
      "hasPrevPage": false,
      "limit": 10
    }
  }
}
```

---

### 🔍 **GET** `/v1/questions/:id`
**Description:** Get a specific question by ID

**Authentication:** Required (JWT Token)

**Request Headers:**
```http
Authorization: Bearer <your_jwt_token>
```

**Request:**
```http
GET /v1/questions/65c1234567890abcdef12345
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Question retrieved successfully",
  "data": {
    "_id": "65c1234567890abcdef12345",
    "title": "What is the difference between let, const, and var in JavaScript?",
    "answer": "In JavaScript, let, const, and var are different ways to declare variables...",
    "category": "JavaScript",
    "level": "Beginner",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Response (Error - 404):**
```json
{
  "success": false,
  "message": "Question not found"
}
```

---

### ✏️ **PUT** `/v1/questions/:id`
**Description:** Update an existing question

**Authentication:** Required (JWT Token)

**Request Headers:**
```http
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body (all fields optional):**
```json
{
  "title": "Updated question title",
  "answer": "Updated answer content",
  "category": "Python",
  "level": "Intermediate"
}
```

**Request:**
```http
PUT /v1/questions/65c1234567890abcdef12345
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Question updated successfully",
  "data": {
    "_id": "65c1234567890abcdef12345",
    "title": "Updated question title",
    "answer": "Updated answer content",
    "category": "Python",
    "level": "Intermediate",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

---

### 🗑️ **DELETE** `/v1/questions/:id`
**Description:** Delete a question

**Authentication:** Required (JWT Token)

**Request Headers:**
```http
Authorization: Bearer <your_jwt_token>
```

**Request:**
```http
DELETE /v1/questions/65c1234567890abcdef12345
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Question deleted successfully",
  "data": {
    "id": "65c1234567890abcdef12345"
  }
}
```

---

### 📂 **GET** `/v1/questions/category/:category`
**Description:** Get questions filtered by specific category

**Authentication:** Required (JWT Token)

**Request Headers:**
```http
Authorization: Bearer <your_jwt_token>
```

**Request:**
```http
GET /v1/questions/category/JavaScript?page=1&limit=10
```

**Response:** Same format as GET `/v1/questions` but filtered by category

---

### 📊 **GET** `/v1/questions/level/:level`
**Description:** Get questions filtered by specific level

**Authentication:** Required (JWT Token)

**Request Headers:**
```http
Authorization: Bearer <your_jwt_token>
```

**Request:**
```http
GET /v1/questions/level/Beginner?page=1&limit=10
```

**Response:** Same format as GET `/v1/questions` but filtered by level

---

### 📈 **GET** `/v1/questions/stats`
**Description:** Get question statistics and analytics

**Authentication:** Required (JWT Token)

**Request Headers:**
```http
Authorization: Bearer <your_jwt_token>
```

**Request:**
```http
GET /v1/questions/stats
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Question statistics retrieved successfully",
  "data": {
    "totalQuestions": 150,
    "categoryStats": [
      { "_id": "JavaScript", "count": 45 },
      { "_id": "Python", "count": 32 },
      { "_id": "React", "count": 28 }
    ],
    "levelStats": [
      { "_id": "Beginner", "count": 60 },
      { "_id": "Intermediate", "count": 55 },
      { "_id": "Advanced", "count": 25 },
      { "_id": "Expert", "count": 10 }
    ]
  }
}
```

---

### 🏷️ **GET** `/v1/questions/categories`
**Description:** Get list of all available categories

**Authentication:** Required (JWT Token)

**Request Headers:**
```http
Authorization: Bearer <your_jwt_token>
```

**Request:**
```http
GET /v1/questions/categories
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "React",
    "Vue",
    "Angular",
    "Database",
    "DevOps",
    "System Design"
  ]
}
```

---

### 📋 **GET** `/v1/questions/levels`
**Description:** Get list of all available difficulty levels

**Authentication:** Required (JWT Token)

**Request Headers:**
```http
Authorization: Bearer <your_jwt_token>
```

**Request:**
```http
GET /v1/questions/levels
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Levels retrieved successfully",
  "data": [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert"
  ]
}
```

---

## 🔧 **Testing Questions API with Postman**

### **Step 1: Get Authentication Token**
First, login to get your JWT token using the auth endpoints.

### **Step 2: Create a Question**
```http
POST {{base_url}}/v1/questions
Authorization: Bearer {{auth_token}}
Content-Type: application/json

{
  "title": "What is the difference between let, const, and var in JavaScript?",
  "answer": "In JavaScript, let, const, and var are different ways to declare variables. var has function scope and can be redeclared and reassigned. let has block scope, can be reassigned but not redeclared. const has block scope and cannot be reassigned or redeclared after initialization.",
  "category": "JavaScript",
  "level": "Beginner"
}
```

### **Step 3: Get All Questions**
```http
GET {{base_url}}/v1/questions?page=1&limit=10
Authorization: Bearer {{auth_token}}
```

### **Step 4: Search Questions**
```http
GET {{base_url}}/v1/questions?search=javascript&category=JavaScript&level=Beginner
Authorization: Bearer {{auth_token}}
```

### **Step 5: Update a Question**
```http
PUT {{base_url}}/v1/questions/{{question_id}}
Authorization: Bearer {{auth_token}}
Content-Type: application/json

{
  "level": "Intermediate"
}
```

---

## 🏷️ Categories Management APIs

### 🆕 **POST** `/v1/categories`
**Description:** Create a new category

**Authentication:** Required (JWT Token)

**Request Headers:**
```http
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Machine Learning",
  "description": "Questions related to machine learning and AI",
  "color": "#10B981",
  "icon": "🤖",
  "isActive": true,
  "sortOrder": 5
}
```

**Field Validation:**
- `name`: Required, string, max 30 characters, unique
- `description`: Optional, string, max 200 characters
- `color`: Optional, valid hex color code (e.g., #3B82F6)
- `icon`: Optional, string, max 10 characters
- `isActive`: Optional, boolean, default: true
- `sortOrder`: Optional, integer, min 0, default: 0

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "_id": "65c1234567890abcdef12345",
    "name": "Machine Learning",
    "description": "Questions related to machine learning and AI",
    "color": "#10B981",
    "icon": "🤖",
    "isActive": true,
    "sortOrder": 5,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 📖 **GET** `/v1/categories`
**Description:** Get paginated categories with search, filtering, and sorting

**Authentication:** Required (JWT Token)

**Request Headers:**
```http
Authorization: Bearer <your_jwt_token>
```

**Query Parameters:**
- `page` (optional): Page number, default: 1
- `limit` (optional): Items per page, default: 10, max: 100
- `search` (optional): Search term for name or description
- `isActive` (optional): Filter by active status (true/false)
- `sortBy` (optional): Sort field (name, sortOrder, createdAt, updatedAt, questionCount), default: sortOrder
- `sortOrder` (optional): Sort order (asc, desc), default: asc

**Request Examples:**
```http
GET /v1/categories
GET /v1/categories?page=1&limit=20
GET /v1/categories?search=machine
GET /v1/categories?isActive=true&sortBy=name&sortOrder=asc
GET /v1/categories?page=2&limit=5&search=ai&isActive=true&sortBy=questionCount&sortOrder=desc
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": {
    "categories": [
      {
        "_id": "65c1234567890abcdef12345",
        "name": "Machine Learning",
        "description": "Questions related to machine learning and AI",
        "color": "#10B981",
        "icon": "🤖",
        "isActive": true,
        "sortOrder": 5,
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalCategories": 25,
      "hasNextPage": true,
      "hasPrevPage": false,
      "limit": 10
    }
  }
}
```

---

### 🔍 **GET** `/v1/categories/:id`
**Description:** Get a specific category by ID

**Authentication:** Required (JWT Token)

**Request Headers:**
```http
Authorization: Bearer <your_jwt_token>
```

**Request:**
```http
GET /v1/categories/65c1234567890abcdef12345
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Category retrieved successfully",
  "data": {
    "_id": "65c1234567890abcdef12345",
    "name": "Machine Learning",
    "description": "Questions related to machine learning and AI",
    "color": "#10B981",
    "icon": "🤖",
    "isActive": true,
    "sortOrder": 5,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### ✏️ **PUT** `/v1/categories/:id`
**Description:** Update an existing category

**Authentication:** Required (JWT Token)

**Request Headers:**
```http
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body (all fields optional):**
```json
{
  "name": "Updated Category Name",
  "description": "Updated description",
  "color": "#EF4444",
  "icon": "🚀",
  "isActive": false,
  "sortOrder": 10
}
```

**Request:**
```http
PUT /v1/categories/65c1234567890abcdef12345
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Category updated successfully",
  "data": {
    "_id": "65c1234567890abcdef12345",
    "name": "Updated Category Name",
    "description": "Updated description",
    "color": "#EF4444",
    "icon": "🚀",
    "isActive": false,
    "sortOrder": 10,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

---

### 🗑️ **DELETE** `/v1/categories/:id`
**Description:** Delete a category (only if no questions are associated)

**Authentication:** Required (JWT Token)

**Request Headers:**
```http
Authorization: Bearer <your_jwt_token>
```

**Request:**
```http
DELETE /v1/categories/65c1234567890abcdef12345
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Category deleted successfully",
  "data": {
    "id": "65c1234567890abcdef12345"
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Cannot delete category. It has 15 question(s) associated with it."
}
```

---

### ✅ **GET** `/v1/categories/active`
**Description:** Get all active categories (for dropdowns, forms, etc.)

**Authentication:** Required (JWT Token)

**Request Headers:**
```http
Authorization: Bearer <your_jwt_token>
```

**Request:**
```http
GET /v1/categories/active
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Active categories retrieved successfully",
  "data": [
    {
      "name": "JavaScript",
      "description": "JavaScript programming questions",
      "color": "#F7DF1E",
      "icon": "⚡"
    },
    {
      "name": "Machine Learning",
      "description": "Questions related to machine learning and AI",
      "color": "#10B981",
      "icon": "🤖"
    }
  ]
}
```

---

### 📊 **GET** `/v1/categories/with-counts`
**Description:** Get categories with question counts for analytics

**Authentication:** Required (JWT Token)

**Request Headers:**
```http
Authorization: Bearer <your_jwt_token>
```

**Request:**
```http
GET /v1/categories/with-counts
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Categories with question counts retrieved successfully",
  "data": [
    {
      "_id": "65c1234567890abcdef12345",
      "name": "JavaScript",
      "description": "JavaScript programming questions",
      "color": "#F7DF1E",
      "icon": "⚡",
      "isActive": true,
      "sortOrder": 1,
      "questionCount": 45,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "65c1234567890abcdef12346",
      "name": "Machine Learning",
      "description": "Questions related to machine learning and AI",
      "color": "#10B981",
      "icon": "🤖",
      "isActive": true,
      "sortOrder": 5,
      "questionCount": 23,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 🔄 **PATCH** `/v1/categories/:id/toggle-status`
**Description:** Toggle category active/inactive status

**Authentication:** Required (JWT Token)

**Request Headers:**
```http
Authorization: Bearer <your_jwt_token>
```

**Request:**
```http
PATCH /v1/categories/65c1234567890abcdef12345/toggle-status
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Category deactivated successfully",
  "data": {
    "_id": "65c1234567890abcdef12345",
    "name": "Machine Learning",
    "description": "Questions related to machine learning and AI",
    "color": "#10B981",
    "icon": "🤖",
    "isActive": false,
    "sortOrder": 5,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:40:00.000Z"
  }
}
```

---

### 📋 **PUT** `/v1/categories/sort-order`
**Description:** Bulk update category sort order

**Authentication:** Required (JWT Token)

**Request Headers:**
```http
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "categories": [
    { "id": "65c1234567890abcdef12345", "sortOrder": 1 },
    { "id": "65c1234567890abcdef12346", "sortOrder": 2 },
    { "id": "65c1234567890abcdef12347", "sortOrder": 3 }
  ]
}
```

**Request:**
```http
PUT /v1/categories/sort-order
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Category sort order updated successfully"
}
```

---

## 🔧 **Testing Categories API with Postman**

### **Step 1: Get Authentication Token**
First, login to get your JWT token using the auth endpoints.

### **Step 2: Create a Category**
```http
POST {{base_url}}/v1/categories
Authorization: Bearer {{auth_token}}
Content-Type: application/json

{
  "name": "Machine Learning",
  "description": "Questions related to machine learning and AI",
  "color": "#10B981",
  "icon": "🤖",
  "isActive": true,
  "sortOrder": 5
}
```

### **Step 3: Get All Categories**
```http
GET {{base_url}}/v1/categories?page=1&limit=10
Authorization: Bearer {{auth_token}}
```

### **Step 4: Get Active Categories**
```http
GET {{base_url}}/v1/categories/active
Authorization: Bearer {{auth_token}}
```

### **Step 5: Update a Category**
```http
PUT {{base_url}}/v1/categories/{{category_id}}
Authorization: Bearer {{auth_token}}
Content-Type: application/json

{
  "color": "#EF4444",
  "icon": "🚀"
}
```

### **Step 6: Toggle Category Status**
```http
PATCH {{base_url}}/v1/categories/{{category_id}}/toggle-status
Authorization: Bearer {{auth_token}}
```

---

## 👥 **Roles Management APIs**

### 🆕 **POST** `/v1/roles`
**Create a new role**

**Request Body:**
```json
{
  "roleConst": "ADMIN"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Role created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "roleConst": "ADMIN",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 📋 **GET** `/v1/roles`
**Get all roles with pagination, search, and filtering**

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `search` (optional): Search in roleConst
- `sortBy` (optional): Sort field - `roleConst`, `createdAt`, `updatedAt` (default: `roleConst`)
- `sortOrder` (optional): Sort order - `asc`, `desc` (default: `asc`)

**Example Request:**
```http
GET /v1/roles?page=1&limit=10&search=ADMIN&sortBy=roleConst&sortOrder=asc
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Roles retrieved successfully",
  "data": {
    "roles": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "roleConst": "ADMIN",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      },
      {
        "_id": "507f1f77bcf86cd799439012",
        "roleConst": "USER",
        "createdAt": "2024-01-15T10:35:00.000Z",
        "updatedAt": "2024-01-15T10:35:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalRoles": 2,
      "hasNextPage": false,
      "hasPrevPage": false,
      "limit": 10
    }
  }
}
```

### 🔍 **GET** `/v1/roles/:id`
**Get a single role by ID**

**Response:**
```json
{
  "success": true,
  "message": "Role retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "roleConst": "ADMIN",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### ✏️ **PUT** `/v1/roles/:id`
**Update a role**

**Request Body:**
```json
{
  "roleConst": "SUPER_ADMIN"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Role updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "roleConst": "SUPER_ADMIN",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:45:00.000Z"
  }
}
```

### 🗑️ **DELETE** `/v1/roles/:id`
**Delete a role**

**Response:**
```json
{
  "success": true,
  "message": "Role deleted successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011"
  }
}
```

**Note:** Cannot delete roles that have users associated with them.

### 📊 **GET** `/v1/roles/with-counts`
**Get roles with user counts**

**Response:**
```json
{
  "success": true,
  "message": "Roles with user counts retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "roleConst": "ADMIN",
      "userCount": 5,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "roleConst": "USER",
      "userCount": 25,
      "createdAt": "2024-01-15T10:35:00.000Z",
      "updatedAt": "2024-01-15T10:35:00.000Z"
    }
  ]
}
```

### 🔍 **GET** `/v1/roles/const/:roleConst`
**Get role by constant**

**Example Request:**
```http
GET /v1/roles/const/ADMIN
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Role retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "roleConst": "ADMIN",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 🔄 **PUT** `/v1/roles/bulk-update`
**Bulk update roles**

**Request Body:**
```json
{
  "roles": [
    {
      "id": "507f1f77bcf86cd799439011",
      "roleConst": "SUPER_ADMIN"
    },
    {
      "id": "507f1f77bcf86cd799439012",
      "roleConst": "MODERATOR"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Roles updated successfully"
}
```

### 🔧 **Testing Roles API with Postman**

#### **Step 1: Get Authentication Token**
```http
POST {{base_url}}/v1/auth/login
Content-Type: application/json

{
  "mobile": "1234567890",
  "password": "your_password"
}
```

#### **Step 2: Create a New Role**
```http
POST {{base_url}}/v1/roles
Authorization: Bearer {{auth_token}}
Content-Type: application/json

{
  "roleConst": "ADMIN"
}
```

#### **Step 3: Get All Roles**
```http
GET {{base_url}}/v1/roles?page=1&limit=10
Authorization: Bearer {{auth_token}}
```

#### **Step 4: Get Roles with User Counts**
```http
GET {{base_url}}/v1/roles/with-counts
Authorization: Bearer {{auth_token}}
```

#### **Step 5: Update a Role**
```http
PUT {{base_url}}/v1/roles/{{role_id}}
Authorization: Bearer {{auth_token}}
Content-Type: application/json

{
  "roleConst": "SUPER_ADMIN"
}
```

#### **Step 6: Delete a Role**
```http
DELETE {{base_url}}/v1/roles/{{role_id}}
Authorization: Bearer {{auth_token}}
```

---

### 📊 **Testing Visit Tracking**

#### **Step 1: Record a Visit (No Auth Required)**
```http
POST {{base_url}}/v1/visits
Content-Type: application/json

{
  "sourceSystemConst": "MY_WEBSITE"
}
```

The API auto-extracts all other information (IP, browser, OS, device, etc.).

#### **Step 2: View All Visits**
```http
GET {{base_url}}/v1/visits?page=1&limit=10
Authorization: Bearer {{auth_token}}
```

#### **Step 3: Get Visit Statistics**
```http
GET {{base_url}}/v1/visits/statistics
Authorization: Bearer {{auth_token}}
```

#### **Step 4: Filter Visits by Device Type**
```http
GET {{base_url}}/v1/visits?deviceType=mobile
Authorization: Bearer {{auth_token}}
```

#### **Step 5: Get Visits by Country**
```http
GET {{base_url}}/v1/visits/by-country
Authorization: Bearer {{auth_token}}
```

#### **Step 6: Get Visits from Specific IP**
```http
GET {{base_url}}/v1/visits/ip/192.168.1.100
Authorization: Bearer {{auth_token}}
```

---

## 🔄 **Updated Question Creation**

Now that categories are dynamic, when creating questions, you need to provide a valid category ID:

```http
POST {{base_url}}/v1/questions
Authorization: Bearer {{auth_token}}
Content-Type: application/json

{
  "title": "What is the difference between let, const, and var in JavaScript?",
  "answer": "In JavaScript, let, const, and var are different ways to declare variables...",
  "category": "JavaScript",
  "level": "Beginner"
}
```

**Note:** The `category` field now accepts any string value (e.g., "قران", "JavaScript", "Machine Learning").

---

*Last Updated: January 2024*  
*API Version: v1*
