import express from 'express';
import { register } from '../controllers/authController';

const router = express.Router();

// register route
router.post('/register', register);

// add other auth related routes, such as login, logout, etc.

export default router;