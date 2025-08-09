# Authentication Integration Guide

This document explains how the Vue.js client integrates with your existing Python authentication server.

## 🔗 Server Integration

### Authentication Server

The client connects to your existing Flask authentication server (`server/auth_server.py`) which provides:

- User registration with license key validation
- User login with machine ID verification
- License verification and management
- HMAC signature-based security

### API Endpoints Used

#### 1. User Registration (`POST /api/register`)

```javascript
{
  email: "user@example.com",
  password_hash: "hashed_password",
  license_key: "LICENSE_KEY_HERE",
  machine_id: "unique_machine_id",
  user_type: "personal|enterprise",
  signature: "hmac_signature"
}
```

#### 2. User Login (`POST /api/login`)

```javascript
{
  email: "user@example.com",
  password_hash: "hashed_password",
  machine_id: "unique_machine_id",
  signature: "hmac_signature"
}
```

#### 3. License Verification (`POST /api/verify`)

```javascript
{
  license_key: "LICENSE_KEY_HERE",
  machine_id: "unique_machine_id",
  signature: "hmac_signature"
}
```

## 🎯 Client Features

### Authentication Views

- **SignIn** (`/auth`) - User login with email/password
- **SignUp** (`/auth/signup`) - User registration with license key
- **AuthSuccess** (`/auth/success`) - Success page for desktop app auth
- **AuthError** (`/auth/error`) - Error handling for failed auth

### Dashboard Views

- **Dashboard** (`/dashboard`) - Main user dashboard with stats
- **License Management** (`/dashboard/license`) - License info and actions
- **Billing History** (`/dashboard/billing`) - Payment history and invoices

### Desktop App Integration

The client supports desktop app authentication through URL parameters:

- `?app_id=desktop` - Identifies desktop app requests
- `?callback=url` - Callback URL for token delivery
- `?machine_id=id` - Pre-filled machine ID

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the client directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_SECRET=your-app-secret-key-here

# App Configuration
VITE_APP_NAME=Computer AI Automation
```

### Server Configuration

Ensure your authentication server is running on `http://localhost:5000` or update the `VITE_API_BASE_URL` accordingly.

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd client
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Start Authentication Server

```bash
cd ../server
python auth_server.py
```

## 🔐 Security Features

### Password Hashing

Passwords are hashed client-side before transmission using a simple hash function. In production, consider using a more robust hashing algorithm.

### HMAC Signatures

All API requests include HMAC signatures to prevent tampering:

```javascript
const generateSignature = (data) => {
  const sortedData = JSON.stringify(data, Object.keys(data).sort());
  return btoa(sortedData + APP_SECRET).slice(0, 32);
};
```

### Machine ID Generation

For web clients, machine ID is generated from:

- User agent string
- Screen resolution
- Timezone

## 📱 Desktop App Authentication Flow

### 1. Desktop App Opens Web Browser

```
https://yourapp.com/auth?app_id=desktop&callback=http://localhost:8080/auth&machine_id=ABC123
```

### 2. User Completes Authentication

The web client handles login/registration with the provided machine ID.

### 3. Token Delivery

After successful authentication, the client redirects to:

```
http://localhost:8080/auth?token=BASE64_ENCODED_USER_DATA&status=success
```

### 4. Desktop App Receives Token

The desktop app extracts and validates the user data from the token.

## 🎨 UI Components

### Authentication Store (`src/stores/auth.js`)

Pinia store managing:

- User state and authentication status
- Login/logout functionality
- Token management
- API communication

### Header Component

Shows different content based on authentication status:

- **Guest**: Sign In button and Download button
- **Authenticated**: User menu with dashboard links and sign out

### Protected Routes

Routes requiring authentication are protected by navigation guards in the router.

## 🔄 State Management

### User Data Structure

```javascript
{
  email: "user@example.com",
  user_type: "personal|enterprise",
  license_valid: true,
  expires_at: 1234567890,
  machine_id: "unique_machine_id"
}
```

### Local Storage

User data is persisted in localStorage for session management across browser refreshes.

## 🐛 Error Handling

### Authentication Errors

- Invalid credentials
- Expired license
- Rate limiting
- Network errors

### User Feedback

- Loading states during authentication
- Clear error messages
- Success confirmations

## 🔧 Development Tips

### Testing Authentication

1. Start the authentication server
2. Generate test license keys using the admin panel
3. Test registration and login flows
4. Verify desktop app integration

### Debugging

- Check browser console for API errors
- Verify server logs for authentication attempts
- Use Vue DevTools to inspect store state

## 📋 Production Checklist

- [ ] Update `VITE_APP_SECRET` with production secret
- [ ] Configure production API URL
- [ ] Implement proper password hashing (bcrypt, etc.)
- [ ] Add rate limiting on client side
- [ ] Enable HTTPS for all authentication flows
- [ ] Test desktop app integration thoroughly
- [ ] Set up error monitoring and logging

## 🤝 Integration with Your Desktop App

To integrate with your existing desktop application:

1. **Generate Machine ID**: Create a unique identifier for each machine
2. **Open Web Browser**: Launch the authentication URL with parameters
3. **Handle Callback**: Set up a local server to receive the authentication token
4. **Store Credentials**: Save the user data securely in your desktop app

Example desktop integration:

```python
import webbrowser
import http.server
import urllib.parse

def authenticate_user():
    machine_id = get_machine_id()
    auth_url = f"https://yourapp.com/auth?app_id=desktop&callback=http://localhost:8080/auth&machine_id={machine_id}"

    # Open browser
    webbrowser.open(auth_url)

    # Start local server to receive callback
    start_callback_server()
```

This integration provides a seamless authentication experience between your web interface and desktop application while maintaining security and user experience standards.
