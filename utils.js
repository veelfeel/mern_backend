import jwt from 'jsonwebtoken';
import config from './config.js';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
  );
};
