import { IRouter, Router } from 'express';
import teamRoutes from './team.routes';
import userRoutes from './user.routes';

const router: IRouter = Router();
router.use(teamRoutes);
router.use(userRoutes);

export default router;
