import User from '../models/User';
import bcrypt from 'bcrypt';

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return User.findOne({ where: { email } });
};

interface CreateUserData {
  username: string;
  email: string;
  password: string;
}

export const createUser = async (userData: CreateUserData): Promise<User> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  return User.create({
    ...userData,
    password: hashedPassword
  });
};

// other user related methods:
// export const updateUser = async (userId: number, updateData: Partial<User>): Promise<User> => { ... }
// export const deleteUser = async (userId: number): Promise<void> => { ... }