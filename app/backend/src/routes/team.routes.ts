import { IRouter, Router } from 'express';
import TeamController from '../controllers/team.controller';

const teamController = new TeamController();

const teamRoutes: IRouter = Router();

teamRoutes.get('/teams', teamController.get.bind(teamController));

export default teamRoutes;
