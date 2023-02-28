import { ModelStatic } from 'sequelize';
import IResponse from '../interfaces/IResponse';
import Matche from '../database/models/Matche';
import Team from '../database/models/Team';
import { grResponse } from '../utils/grResponse';

class MatcheService {
  private model: ModelStatic<Matche> = Matche;

  async get(inProgress: string): Promise<IResponse> {
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    if (!inProgress) return grResponse(200, matches);

    const isTrue = inProgress === 'true';
    if (isTrue) return grResponse(200, matches.filter((e) => e.inProgress));

    const isFalse = inProgress === 'false';
    if (isFalse) return grResponse(200, matches.filter((e) => !e.inProgress));

    return grResponse(200, matches);
  }

  async finish(id: number): Promise<IResponse> {
    // const matche = await this.model.findByPk(id);
    await this.model.update({ inProgress: false }, { where: { id } });
    return grResponse(200, { message: 'Finished' });
  }
}

export default MatcheService;
