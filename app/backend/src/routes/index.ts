import { IRouter, Router } from 'express';
import teamRoutes from './team.routes';
import userRoutes from './user.routes';
import matcheRoutes from './matche.routes';

const router: IRouter = Router();
router.use(teamRoutes);
router.use(userRoutes);
router.use(matcheRoutes);

export default router;
