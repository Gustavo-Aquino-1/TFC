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
}

export default UserController;
