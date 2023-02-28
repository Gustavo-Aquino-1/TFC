import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';

class UserController {
  private service: UserService = new UserService();

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.login(req.body);
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  static getRole(_req: Request, res: Response, next: NextFunction) {
    try {
      const { payload } = res.locals.user;
      const { role } = payload;
      res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
