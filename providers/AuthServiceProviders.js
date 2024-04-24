// authServiceProvider.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthServiceProvider {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }

    async registerUser(userData) {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = new this.UserModel({
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
        });
        await newUser.save();
        return newUser;
    }

    async loginUser(credentials) {
        const { email, password } = credentials;
        const user = await this.UserModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
        const refreshToken = jwt.sign({ userId: user._id }, 'refresh-secret-key', { expiresIn: '7d' }); // Example refresh token
        return { user, token, refreshToken };
    }

    async verifyToken(token) {
        try {
            const decodedToken = jwt.verify(token, 'your-secret-key');
            const user = await this.UserModel.findById(decodedToken.userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    async generatePasswordResetToken(email) {
        // Generate and store a password reset token for the user
        const user = await this.UserModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const resetToken = jwt.sign({ userId: user._id }, 'reset-secret-key', { expiresIn: '1h' }); // Example reset token
        // Store the resetToken in the database or send it via email to the user
        return resetToken;
    }

    async resetPassword(email, resetToken, newPassword) {
        // Validate the reset token and update the user's password
        // This is a simplified example; in a real application, you would validate the token's expiration, etc.
        const decodedToken = jwt.verify(resetToken, 'reset-secret-key');
        const user = await this.UserModel.findById(decodedToken.userId);
        if (!user || user.email !== email) {
            throw new Error('Invalid token or email');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return user;
    }

    async verifyEmail(email, verificationToken) {
        // Verify the email address using a verification token
        const user = await this.UserModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        // Example: Compare the verificationToken with the one stored in the database
        const storedToken = user.verificationToken;
        if (verificationToken !== storedToken) {
            throw new Error('Invalid verification token');
        }

        // Mark the email as verified in the database
        user.emailVerified = true;
        await user.save();
        return user;
    }

    async refreshAccessToken(refreshToken) {
        try {
            const decodedToken = jwt.verify(refreshToken, 'refresh-secret-key');
            const user = await this.UserModel.findById(decodedToken.userId);
            if (!user) {
                throw new Error('User not found');
            }

            const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
            return token;
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }
    async generate2FASecret(userId) {
        // Generate and store a secret key for 2FA
        const user = await this.UserModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Generate a unique secret key for 2FA (using a library like speakeasy)
        const secret = speakeasy.generateSecret({ length: 20 });
        user.twoFactorSecret = secret.base32;
        await user.save();
        return secret.otpauth_url;
    }

    async verify2FAToken(userId, token) {
        const user = await this.UserModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Verify the 2FA token (using a library like speakeasy)
        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token,
        });

        return verified;
    }

    async generateOAuthRedirectURL(provider, redirectURI) {
        // Generate OAuth redirect URL for the specified provider
        // Example: Generate URLs for Google, Facebook, Twitter OAuth
        let oauthURL;
        if (provider === 'google') {
            oauthURL = 'https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=' + redirectURI + '&response_type=code&scope=email%20profile';
        } else if (provider === 'facebook') {
            oauthURL = 'https://www.facebook.com/v13.0/dialog/oauth?client_id=YOUR_CLIENT_ID&redirect_uri=' + redirectURI + '&scope=email';
        } else if (provider === 'twitter') {
            oauthURL = 'https://api.twitter.com/oauth/authenticate?oauth_token=YOUR_OAUTH_TOKEN';
        }

        return oauthURL;
    }

    async verifyOAuthCallback(provider, code, redirectURI) {
        // Verify OAuth callback and exchange code for access token
        let accessToken;
        if (provider === 'google') {
            // Exchange authorization code for access token (using a library like axios)
            const response = await axios.post('https://oauth2.googleapis.com/token', {
                client_id: 'YOUR_CLIENT_ID',
                client_secret: 'YOUR_CLIENT_SECRET',
                code,
                redirect_uri: redirectURI,
                grant_type: 'authorization_code',
            });
            accessToken = response.data.access_token;
        } else if (provider === 'facebook') {
            // Exchange authorization code for access token (using a library like axios)
            const response = await axios.get('https://graph.facebook.com/v13.0/oauth/access_token', {
                params: {
                    client_id: 'YOUR_CLIENT_ID',
                    client_secret: 'YOUR_CLIENT_SECRET',
                    code,
                    redirect_uri: redirectURI,
                },
            });
            accessToken = response.data.access_token;
        }

        return accessToken;
    }

    async grantAccess(user, resource, action) {
        // Check user permissions and grant access to the specified resource/action
        // Example ACL implementation
        const allowedRoles = accessControlList[resource][action];
        if (!allowedRoles) {
            throw new Error('Invalid resource/action');
        }

        const hasPermission = user.roles.some(role => allowedRoles.includes(role));
        return hasPermission;
    }
}

module.exports = AuthServiceProvider;
