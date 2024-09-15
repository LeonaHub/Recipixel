import User from '../models/User';
import bcrypt from 'bcrypt';

interface UserInput {
  username: string;
  email: string;
  password: string;
}

export const createUser = async (userData: UserInput) => {
  try {
    // 1. hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // 2. create a new user record
    const newUser = await User.create({
      username: userData.username,
      email: userData.email,
      password: hashedPassword
    });

    // 3. return the created user (without password)
    const { password, ...userWithoutPassword } = newUser.toJSON();
    return userWithoutPassword;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Error creating user');
  }
};

// add a function to find a user by email
export const findUserByEmail = async (email: string) => {
  return User.findOne({ where: { email } });
};