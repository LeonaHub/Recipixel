import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { generateToken } from '../utils/jwtUtils';
import { validateRegisterInput } from '../utils/validationUtils';

export const register = async (req: Request, res: Response) => {
  try {
    // 1. validate the input data
    const { error } = validateRegisterInput(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { username, email, password } = req.body;

    // 2. check if the user already exists
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // 3. create a new user
    const newUser = await userService.createUser({ username, email, password });

    // 4. generate a JWT
    const token = generateToken(newUser.id.toString());

    // 5. send the response
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.id, username: newUser.username, email: newUser.email },
      token
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};