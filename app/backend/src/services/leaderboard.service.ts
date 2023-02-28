import { ModelStatic } from 'sequelize';
import IResponse from '../interfaces/IResponse';
import Matche from '../database/models/Matche';
import Team from '../database/models/Team';
import { grResponse } from '../utils/grResponse';
import ILeaderboard from '../interfaces/ILeaderboard';
import { rankTeam, grResults,
  orderRank, grResultsGeneral, rankTeamGeneral } from '../utils/leaderboardFunctions';
// import Tteam from '../interfaces/ITeamTypes';

class LeaderboardService {
  private matche: ModelStatic<Matche> = Matche;
  private team: ModelStatic<Team> = Team;

  async rankHome(): Promise<IResponse> {
    const teams = await this.team.findAll();
    const matches = await this.matche.findAll({ where: { inProgress: false } });

    const result: ILeaderboard[] = [];

    teams.forEach((e) => {
      const matchesByTeam = matches.filter((el) => el.homeTeamId === e.id);
      const results = grResults(matchesByTeam, [
        'homeTeamGoals',
        'awayTeamGoals',
      ]);

      result.push(
        rankTeam(e, results, matchesByTeam, ['homeTeamGoals', 'awayTeamGoals']),
      );
    });

    return grResponse(200, orderRank(result));
  }

  async rankAway(): Promise<IResponse> {
    const teams = await this.team.findAll();
    const matches = await this.matche.findAll({ where: { inProgress: false } });

    const result: ILeaderboard[] = [];

    teams.forEach((e) => {
      const matchesByTeam = matches.filter((el) => el.awayTeamId === e.id);
      const results = grResults(matchesByTeam, [
        'awayTeamGoals',
        'homeTeamGoals',
      ]);

      result.push(
        rankTeam(e, results, matchesByTeam, ['awayTeamGoals', 'homeTeamGoals']),
      );
    });

    return grResponse(200, orderRank(result));
  }

  async rank(): Promise<IResponse> {
    const teams = await this.team.findAll();
    const matches = await this.matche.findAll({ where: { inProgress: false } });

    const result: ILeaderboard[] = [];

    teams.forEach((e) => {
      const matchesByTeam = matches.filter(
        (el) => el.awayTeamId === e.id || el.homeTeamId === e.id,
      );

      const results = grResultsGeneral(e.id, matchesByTeam);

      result.push(rankTeamGeneral(e, results, matchesByTeam));
    });

    return grResponse(200, orderRank(result));
  }
}

export default LeaderboardService;
