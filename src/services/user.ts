import db from '../db/dbClient';

export const findUser = async (email: string) => {
  const user = await db.user.findUnique({ where: { email } });
  return user;
};

export const findOrCreateUser = async (email: string) => {
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
  });

  // Return the new user object
  return newUser;
};
