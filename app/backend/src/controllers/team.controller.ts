import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/team.service';

class TeamController {
  private service: TeamService = new TeamService();

  async get(_req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.get();
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
}

export default TeamController;
