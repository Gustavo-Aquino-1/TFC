import { IRouter, Router } from 'express';
import teamRoutes from './team.routes';
import userRoutes from './user.routes';
import matcheRoutes from './matche.routes';
import leaderboardRoutes from './leaderboard.routes';

const router: IRouter = Router();
router.use(teamRoutes);
router.use(userRoutes);
router.use(matcheRoutes);
router.use(leaderboardRoutes);

export default router;
