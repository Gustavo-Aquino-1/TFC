import { ModelStatic } from 'sequelize';
import Team from '../database/models/Team';
import IResponse from '../interfaces/IResponse';
import { grResponse } from '../utils/grResponse';

class TeamService {
  private model: ModelStatic<Team> = Team;

  async get(): Promise<IResponse> {
    const teams = await this.model.findAll();
    return grResponse(200, teams);
  }

  async getById(id: number): Promise<IResponse> {
    const teams = await this.model.findByPk(id);
    return grResponse(200, teams);
  }
}

export default TeamService;
