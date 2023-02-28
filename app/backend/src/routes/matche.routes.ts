import { IRouter, Router } from 'express';
import MatcheController from '../controllers/matche.controller';
import verifyToken from '../middlewares/verifyToken';
// import verifyToken from '../middlewares/verifyToken';

const matcheController = new MatcheController();

const matcheRoutes: IRouter = Router();

matcheRoutes.get('/matches', matcheController.get.bind(matcheController));

matcheRoutes.patch(
  '/matches/:id/finish',
  verifyToken,
  matcheController.finish.bind(matcheController),
);

matcheRoutes.patch(
  '/matches/:id',
  verifyToken,
  matcheController.update.bind(matcheController),
);

export default matcheRoutes;
