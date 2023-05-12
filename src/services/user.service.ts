import db from '../db/dbClient';
import { UserDTO } from '../models/user.model';

export const findUser = async (email: string): Promise<UserDTO | null> => {
  const user = await db.user.findUnique({
    where: { email },
    select: { email: true },
  });

  return user;
};

export const findOrCreateUser = async (email: string): Promise<UserDTO> => {
  // Check if user already exists in the database based on email
  const existingUser = await findUser(email);

  if (existingUser) {
    // User already exists in the database, return the user object
    return existingUser;
  }

  // User does not exist in the database, create a new user
  const newUser = await db.user.create({
    data: {
      email,
      provider: 'google',
    },
    select: {
      email: true,
    },
  });

  // Return the new user object
  return newUser;
};

export const getAllUsers = async (): Promise<UserDTO[]> => {
  const user = await db.user.findMany({ select: { email: true } });

  return user;
};
