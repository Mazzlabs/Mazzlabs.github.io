"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connection_1 = require("../database/connection");
const router = express_1.default.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'rip-city-dev-secret-key';
// Validation schemas
const registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    preferences: zod_1.z.object({
        categories: zod_1.z.array(zod_1.z.enum(['sports', 'music', 'theater', 'family'])).optional(),
        venues: zod_1.z.array(zod_1.z.string()).optional(),
        maxPrice: zod_1.z.number().positive().optional(),
        minSavings: zod_1.z.number().min(0).max(100).optional(),
        alertMethods: zod_1.z.array(zod_1.z.enum(['email', 'sms', 'push'])).optional()
    }).optional()
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
// User Registration
router.post('/register', async (req, res) => {
    try {
        const userData = registerSchema.parse(req.body);
        // Check if user exists
        const existingUser = await connection_1.db.user.findUnique({
            where: { email: userData.email }
        });
        if (existingUser) {
            return res.status(400).json({
                error: 'User already exists',
                code: 'USER_EXISTS'
            });
        }
        // Hash password
        const hashedPassword = await bcrypt_1.default.hash(userData.password, 12);
        // Create user
        const user = await connection_1.db.user.create({
            data: {
                email: userData.email,
                password: hashedPassword,
                firstName: userData.firstName,
                lastName: userData.lastName,
                preferences: userData.preferences
            }
        });
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            email: user.email
        }, JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            },
            token
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                error: 'Validation failed',
                details: error.errors
            });
        }
        console.error('Registration error:', error);
        res.status(500).json({
            error: 'Internal server error',
            code: 'REGISTRATION_FAILED'
        });
    }
});
// User Login
router.post('/login', async (req, res) => {
    try {
        const loginData = loginSchema.parse(req.body);
        // Find user
        const user = await connection_1.db.user.findUnique({
            where: { email: loginData.email }
        });
        if (!user) {
            return res.status(401).json({
                error: 'Invalid credentials',
                code: 'INVALID_CREDENTIALS'
            });
        }
        // Verify password
        const isValidPassword = await bcrypt_1.default.compare(loginData.password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                error: 'Invalid credentials',
                code: 'INVALID_CREDENTIALS'
            });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            email: user.email
        }, JWT_SECRET, { expiresIn: '7d' });
        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            },
            token
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                error: 'Validation failed',
                details: error.errors
            });
        }
        console.error('Login error:', error);
        res.status(500).json({
            error: 'Internal server error',
            code: 'LOGIN_FAILED'
        });
    }
});
// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    if (!token) {
        return res.status(401).json({
            error: 'Access token required',
            code: 'NO_TOKEN'
        });
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                error: 'Invalid or expired token',
                code: 'INVALID_TOKEN'
            });
        }
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
// Get user profile (protected route)
router.get('/profile', exports.authenticateToken, async (req, res) => {
    try {
        const user = await connection_1.db.user.findUnique({
            where: { id: req.user.userId }
        });
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
                code: 'USER_NOT_FOUND'
            });
        }
        res.json({
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    }
    catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({
            error: 'Internal server error',
            code: 'PROFILE_FETCH_FAILED'
        });
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map