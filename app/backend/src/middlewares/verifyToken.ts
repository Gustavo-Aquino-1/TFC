import { verify } from 'jsonwebtoken';
import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';

const secret = process.env.JWT_SECRET as string;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Token not found' });
    const decoded = verify(token, secret);
    res.locals.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default verifyToken;
