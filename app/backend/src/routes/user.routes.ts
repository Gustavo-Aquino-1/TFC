import { IRouter, Router } from 'express';
import UserController from '../controllers/user.controller';
import midLogin from '../middlewares/login.mid';

const userController = new UserController();

const userRoutes: IRouter = Router();

userRoutes.post('/login', midLogin, userController.login.bind(userController));

export default userRoutes;
