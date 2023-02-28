import ILeaderboard from '../interfaces/ILeaderboard';
import Matche from '../database/models/Matche';
import Team from '../database/models/Team';

const count = (str: string, arr: string[]) => {
  let sum = 0;
  arr.forEach((e) => {
    if (e === str) sum += 1;
  });
  return sum;
};

const rankTeam = (e: Team, results: string[], matchesByTeam: Matche[], t: string[]) => {
  const key1 = `${t[0]}` as ('awayTeamGoals' | 'homeTeamGoals');
  const key2 = `${t[1]}` as ('awayTeamGoals' | 'homeTeamGoals');
  const goalsFavor = matchesByTeam.reduce((a, c) => a + c[`${key1}`], 0);
  const goalsOwn = matchesByTeam.reduce((a, c) => a + c[`${key2}`], 0);
  const points = count('v', results) * 3 + count('d', results);
  const efficiency = ((points / (results.length * 3)) * 100).toFixed(2);
  return {
    name: e.teamName,
    totalPoints: points,
    totalGames: results.length,
    totalVictories: count('v', results),
    totalDraws: count('d', results),
    totalLosses: count('l', results),
    goalsFavor,
    goalsOwn,
    goalsBalance: goalsFavor - goalsOwn,
    efficiency: +efficiency,
  };
};

const grResults = (matches: Matche[], t: string[]) => {
  const key1 = `${t[0]}` as ('awayTeamGoals' | 'homeTeamGoals');
  const key2 = `${t[1]}` as ('awayTeamGoals' | 'homeTeamGoals');
  return matches.map((el) => {
    if (el[key1] > el[key2]) return 'v';
    if (el[key1] === el[key2]) return 'd';
    return 'l';
  }) as string[];
};

// 1º Total de Vitórias; 2º Saldo de gols; 3º Gols a favor; 4º Gols sofridos.

const orderRank = (arr: ILeaderboard[]) => {
  arr.sort((a, b) => {
    if (b.totalVictories !== a.totalVictories) return b.totalVictories > a.totalVictories ? 1 : -1;
    if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance > a.goalsBalance ? 1 : -1;
    if (b.goalsFavor !== a.goalsFavor) return b.goalsFavor > a.goalsFavor ? 1 : -1;
    return b.goalsOwn < a.goalsOwn ? 1 : -1;
  });
  return arr;
};

export { rankTeam, grResults, orderRank };
