import { NextFunction, Request, Response } from 'express';
import MatcheService from '../services/matche.service';

class MatcheController {
  private service: MatcheService = new MatcheService();

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;
      const { status, message } = await this.service.get(inProgress as string);
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  async finish(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.finish(+id);
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
}

export default MatcheController;
