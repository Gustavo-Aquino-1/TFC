import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  private service: LeaderboardService = new LeaderboardService();

  async rankHome(_req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.rankHome();
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
}

export default LeaderboardController;
