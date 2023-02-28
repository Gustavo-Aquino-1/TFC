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
  const key1 = `${t[0]}` as 'awayTeamGoals' | 'homeTeamGoals';
  const key2 = `${t[1]}` as 'awayTeamGoals' | 'homeTeamGoals';
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
  const key1 = `${t[0]}` as 'awayTeamGoals' | 'homeTeamGoals';
  const key2 = `${t[1]}` as 'awayTeamGoals' | 'homeTeamGoals';
  return matches.map((el) => {
    if (el[key1] > el[key2]) return 'v';
    if (el[key1] === el[key2]) return 'd';
    return 'l';
  }) as string[];
};

const grResultsGeneral = (id: number, matches: Matche[]) => matches.map((el) => {
  const actTeam = el.awayTeamId === id ? 'awayTeamGoals' : 'homeTeamGoals';
  const otherTeam = actTeam === 'awayTeamGoals' ? 'homeTeamGoals' : 'awayTeamGoals';
  if (el[actTeam] > el[otherTeam]) return 'v';
  if (el[actTeam] === el[otherTeam]) return 'd';
  return 'l';
}) as string[];

const getGoals = (el: Team, matchesByTeam: Matche[]) => {
  let goalsFavor = 0;
  let goalsOwn = 0;
  matchesByTeam.forEach((e) => {
    const actTeam = e.awayTeamId === el.id ? 'awayTeamGoals' : 'homeTeamGoals';
    const otherTeam = actTeam === 'awayTeamGoals' ? 'homeTeamGoals' : 'awayTeamGoals';
    goalsFavor += e[actTeam];
    goalsOwn += e[otherTeam];
  });

  return { goalsFavor, goalsOwn };
};

const rankTeamGeneral = (e: Team, results: string[], matchesByTeam: Matche[]) => {
  const { goalsFavor, goalsOwn } = getGoals(e, matchesByTeam);
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

const resolve = (n1: number, n2: number) => {
  if (n1 > n2) return 1;
  return -1;
};

const orderRank = (arr: ILeaderboard[]) => {
  arr.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return resolve(b.totalPoints, a.totalPoints);
    if (b.totalVictories !== a.totalVictories) return resolve(b.totalVictories, a.totalVictories);
    if (b.goalsBalance !== a.goalsBalance) return resolve(b.goalsBalance, a.goalsBalance);
    if (b.goalsFavor !== a.goalsFavor) return resolve(b.goalsFavor, a.goalsFavor);
    return resolve(b.goalsOwn, a.goalsOwn);
  });
  return arr;
};

export { rankTeam, grResults, orderRank, grResultsGeneral, rankTeamGeneral };
