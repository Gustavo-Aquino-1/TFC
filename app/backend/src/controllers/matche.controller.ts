import { NextFunction, Request, Response } from 'express';
import MatcheService from '../services/matche.service';

class MatcheController {
  private service: MatcheService = new MatcheService();

  async get(_req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.get();
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
}

export default MatcheController;
