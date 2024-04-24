# AuthServiceProvider Documentation

The `AuthServiceProvider` class provides authentication services such as user registration, login, password reset, 2FA (two-factor authentication), OAuth integration, access control, and token management.

## Installation

To use the `AuthServiceProvider`, follow these steps:

1. Install the required dependencies:
   - bcrypt: `npm install bcrypt`
   - jsonwebtoken: `npm install jsonwebtoken`
   - speakeasy (for 2FA): `npm install speakeasy`

2. Import the `AuthServiceProvider` into your Node.js application:
   ```javascript
   const AuthServiceProvider = require('./authServiceProvider');
   const UserModel = require('./models/User'); // Import your user model
   const authService = new AuthServiceProvider(UserModel);
    ```

# Methods

## Register User

```javascript
async registerUser(userData) {
    try {
        const newUser = await authService.registerUser(userData);
        console.log('User registered:', newUser);
    } catch (error) {
        console.error('Registration failed:', error.message);
    }
}
```
## Login User

```javascript
async loginUser(credentials) {
    try {
        const { user, token, refreshToken } = await authService.loginUser(credentials);
        console.log('User logged in:', user);
        console.log('Access Token:', token);
        console.log('Refresh Token:', refreshToken);
    } catch (error) {
        console.error('Login failed:', error.message);
    }
}
```

## Verify Token

```javascript
async verifyToken(token) {
    try {
        const user = await authService.verifyToken(token);
        console.log('Token verified for user:', user);
    } catch (error) {
        console.error('Token verification failed:', error.message);
    }
}
```
#### Generate Password Reset Token

```javascript
async generatePasswordResetToken(email) {
    try {
        const resetToken = await authService.generatePasswordResetToken(email);
        console.log('Password reset token generated:', resetToken);
    } catch (error) {
        console.error('Token generation failed:', error.message);
    }
}
```
#### Reset Password

```javascript
async resetPassword(email, resetToken, newPassword) {
    try {
        const user = await authService.resetPassword(email, resetToken, newPassword);
        console.log('Password reset successful for user:', user);
    } catch (error) {
        console.error('Password reset failed:', error.message);
    }
}
```
#### Verify Email

```javascript
async verifyEmail(email, verificationToken) {
    try {
        const user = await authService.verifyEmail(email, verificationToken);
        console.log('Email verified for user:', user);
    } catch (error) {
        console.error('Email verification failed:', error.message);
    }
}
```

#### Refresh Access Token

```javascript
async refreshAccessToken(refreshToken) {
    try {
        const token = await authService.refreshAccessToken(refreshToken);
        console.log('Access token refreshed:', token);
    } catch (error) {
        console.error('Token refresh failed:', error.message);
    }
}
```

#### Generate 2FA Secret

```javascript
async generate2FASecret(userId) {
    try {
        const secretUrl = await authService.generate2FASecret(userId);
        console.log('2FA secret generated:', secretUrl);
    } catch (error) {
        console.error('2FA secret generation failed:', error.message);
    }
}

```

#### Verify 2FA Token

```javascript
async verify2FAToken(userId, token) {
    try {
        const verified = await authService.verify2FAToken(userId, token);
        console.log('2FA token verified:', verified);
    } catch (error) {
        console.error('2FA token verification failed:', error.message);
    }
}
```

#### Generate OAuth Redirect URL

```javascript
async generateOAuthRedirectURL(provider, redirectURI) {
    try {
        const oauthURL = await authService.generateOAuthRedirectURL(provider, redirectURI);
        console.log('OAuth redirect URL:', oauthURL);
    } catch (error) {
        console.error('OAuth URL generation failed:', error.message);
    }
}
```

#### Verify OAuth Callback

```javascript
async verifyOAuthCallback(provider, code, redirectURI) {
    try {
        const accessToken = await authService.verifyOAuthCallback(provider, code, redirectURI);
        console.log('Access token:', accessToken);
    } catch (error) {
        console.error('OAuth verification failed:', error.message);
    }
}
```

#### Grant Access

```javascript
async grantAccess(user, resource, action) {
    try {
        const hasAccess = await authService.grantAccess(user, resource, action);
        console.log('Access granted:', hasAccess);
    } catch (error) {
        console.error('Access grant failed:', error.message);
    }
}

```

#### Conclusion

The AuthServiceProvider offers a comprehensive set of authentication services for your Node.js application. Customize these methods as needed and handle errors appropriately based on your application's requirements.

For detailed usage and customization instructions, refer to the inline comments in the `authServiceProvider.js` file and the documentation of the libraries used (`bcrypt`, `jsonwebtoken`, `speakeasy`, etc.).

