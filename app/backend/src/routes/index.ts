import { IRouter, Router } from 'express';
import teamRoutes from './team.routes';

const router: IRouter = Router();
router.use(teamRoutes);

export default router;
