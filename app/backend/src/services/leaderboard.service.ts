import { ModelStatic } from 'sequelize';
import IResponse from '../interfaces/IResponse';
import Matche from '../database/models/Matche';
import Team from '../database/models/Team';
import { grResponse } from '../utils/grResponse';
import ILeaderboard from '../interfaces/ILeaderboard';

const count = (str: string, arr: string[]) => {
  let sum = 0;
  arr.forEach((e) => {
    if (e === str) sum += 1;
  });
  return sum;
};

const grResults = (matches: Matche[]) =>
  matches.map((el) => {
    if (el.homeTeamGoals > el.awayTeamGoals) return 'v';
    if (el.homeTeamGoals === el.awayTeamGoals) return 'd';
    return 'l';
  }) as string[];

const rankTeam = (e: Team, results: string[], matchesByTeam: Matche[]) => {
  const goalsFavor = matchesByTeam.reduce((a, c) => a + c.homeTeamGoals, 0);
  const goalsOwn = matchesByTeam.reduce((a, c) => a + c.awayTeamGoals, 0);
  // const points = count('v', results) * 3 + count('d', results);
  // const efficiency = (points / (results.length * 3)) * 100;
  return {
    name: e.teamName,
    totalPoints: count('v', results) * 3 + count('d', results),
    totalGames: results.length,
    totalVictories: count('v', results),
    totalDraws: count('d', results),
    totalLosses: count('l', results),
    goalsFavor,
    goalsOwn,
    // goalsBalance: goalsFavor - goalsOwn,
    // efficiency,
  };
};

class LeaderboardService {
  private matche: ModelStatic<Matche> = Matche;
  private team: ModelStatic<Team> = Team;

  async rankHome(): Promise<IResponse> {
    const teams = await this.team.findAll();
    const matches = await this.matche.findAll({ where: { inProgress: false } });

    const result: ILeaderboard[] = [];

    teams.forEach((e) => {
      const matchesByTeam = matches.filter((el) => el.homeTeamId === e.id);
      const results = grResults(matchesByTeam);

      result.push(rankTeam(e, results, matchesByTeam));
    });
    return grResponse(200, result);
  }
}

export default LeaderboardService;
