import { IRouter, Router } from 'express';
import UserController from '../controllers/user.controller';
import midLogin from '../middlewares/login.mid';
import verifyToken from '../middlewares/verifyToken';

const userController = new UserController();

const userRoutes: IRouter = Router();

userRoutes.post('/login', midLogin, userController.login.bind(userController));

userRoutes.get(
  '/login/role',
  verifyToken,
  UserController.getRole,
);

export default userRoutes;
