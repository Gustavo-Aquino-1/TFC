import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';

import { app } from '../app';
import Matche from '../database/models/Matche';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  beforeEach(sinon.restore);

  const matcheList = [
    new Matche({
      id: 4,
      homeTeamId: 3,
      awayTeamId: 2,
      homeTeamGoals: 0,
      awayTeamGoals: 0,
      inProgress: false,
    }),
    new Matche({
      id: 10,
      homeTeamId: 2,
      awayTeamId: 9,
      homeTeamGoals: 0,
      awayTeamGoals: 2,
      inProgress: false,
    }),
    new Matche({
      id: 19,
      homeTeamId: 11,
      awayTeamId: 2,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      inProgress: false,
    }),
    new Matche({
      id: 25,
      homeTeamId: 2,
      awayTeamId: 6,
      homeTeamGoals: 0,
      awayTeamGoals: 1,
      inProgress: false,
    }),
    new Matche({
      id: 36,
      homeTeamId: 2,
      awayTeamId: 7,
      homeTeamGoals: 0,
      awayTeamGoals: 1,
      inProgress: false,
    }),
  ];

  const teamList = [
    new Team({
      id: 2,
      teamName: 'Bahia',
    }),
  ];

  const returnResult = [
    {
      name: 'Bahia',
      totalPoints: 0,
      totalGames: 3,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 3,
      goalsFavor: 0,
      goalsOwn: 4,
      goalsBalance: -4,
      efficiency: 0
    },
  ];

  const returnResult2 = [
    {
      name: 'Bahia',
      totalPoints: 2,
      totalGames: 2,
      totalVictories: 0,
      totalDraws: 2,
      totalLosses: 0,
      goalsFavor: 2,
      goalsOwn: 2,
      goalsBalance: 0,
      efficiency: 33.33
    },
  ];
  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Testa get leaderboard home', async () => {
    sinon
      .stub(Model, 'findAll')
      .onFirstCall()
      .resolves(teamList)
      .onSecondCall()
      .resolves(matcheList);

    const result = await chai.request(app).get('/leaderboard/home');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal(returnResult);
  });

  it('Testa get leaderboard home', async () => {
    sinon
      .stub(Model, 'findAll')
      .onFirstCall()
      .resolves(teamList)
      .onSecondCall()
      .resolves(matcheList);

    const result = await chai.request(app).get('/leaderboard/away');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal(returnResult2);
  });
});
