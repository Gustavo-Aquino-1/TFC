import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';

import { app } from '../app';
import Matche from '../database/models/Matche';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  beforeEach(sinon.restore);

  const matcheList = [
    new Matche({
      id: 1,
      homeTeamId: 1,
      homeTeamGoals: 1,
      awayTeamId: 2,
      awayTeamGoals: 2,
      inProgress: true,
    }),
    new Matche({
      id: 2,
      homeTeamId: 3,
      homeTeamGoals: 4,
      awayTeamId: 5,
      awayTeamGoals: 2,
      inProgress: false,
    }),
  ];

  const matcheListControl = [
    {
      id: 1,
      homeTeamId: 1,
      homeTeamGoals: 1,
      awayTeamId: 2,
      awayTeamGoals: 2,
      inProgress: true,
    },
    {
      id: 2,
      homeTeamId: 3,
      homeTeamGoals: 4,
      awayTeamId: 5,
      awayTeamGoals: 2,
      inProgress: false,
    },
  ];

  const createMatche = {
    homeTeamId: 1,
    homeTeamGoals: 1,
    awayTeamId: 2,
    awayTeamGoals: 2,
    inProgress: true,
  };

  const createMatcheErr = {
    homeTeamId: 1,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 2,
    inProgress: true,
  };

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

  it('Testa get do matche ', async () => {
    sinon.stub(Model, 'findAll').resolves(matcheList);

    const result = await chai.request(app).get('/matches');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal(matcheListControl);
  });

  it('Testa get do matche com inProgress true', async () => {
    sinon.stub(Model, 'findAll').resolves(matcheList);

    const result = await chai.request(app).get('/matches?inProgress=true');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal([matcheListControl[0]]);
  });

  it('Testa get do matche com inProgress true', async () => {
    sinon.stub(Model, 'findAll').resolves(matcheList);

    const result = await chai.request(app).get('/matches?inProgress=false');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal([matcheListControl[1]]);
  });

  it('Testa finish do matche sem passar o token', async () => {
    sinon.stub(Model, 'update').resolves();

    const result = await chai.request(app).patch('/matches/1/finish');

    expect(result.status).to.be.equal(401);
    expect(result.body).to.deep.equal({ message: 'Token not found' });
  });

  it('Testa finish do matche passando token invalido', async () => {
    sinon.stub(Model, 'update').resolves();

    const result = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('Authorization', '8bs');

    expect(result.status).to.be.equal(401);
    expect(result.body).to.deep.equal({
      message: 'Token must be a valid token',
    });
  });

  it('Testa finish do matche passando token invalido', async () => {
    sinon.stub(Model, 'update').resolves();

    const result = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('Authorization', '8bs');

    expect(result.status).to.be.equal(401);
    expect(result.body).to.deep.equal({
      message: 'Token must be a valid token',
    });
  });

  it('Testa finish do matche passando token valido', async () => {
    sinon.stub(Model, 'update').resolves();

    const result = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJuYW1lIjoiQWRtaW4ifSwiaWF0IjoxNjc3NTkxODEwLCJleHAiOjE2Nzg0NTU4MTB9.49swV3jOhW_qumAUVQBQqRpTUsJkD1JMqeXxoV8VZmI',
      );

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal({ message: 'Finished' });
  });

  it('Testa update do matche token valido', async () => {
    sinon.stub(Model, 'update').resolves();

    const result = await chai
      .request(app)
      .patch('/matches/1')
      .send({
        homeTeamGoals: 100,
        awayTeamGoals: 81,
      })
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJuYW1lIjoiQWRtaW4ifSwiaWF0IjoxNjc3NTkxODEwLCJleHAiOjE2Nzg0NTU4MTB9.49swV3jOhW_qumAUVQBQqRpTUsJkD1JMqeXxoV8VZmI',
      );

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal({ message: 'updated' });
  });

  it('Testa create do matche', async () => {
    sinon.stub(Model, 'create').resolves(matcheList[1]);

    const result = await chai
      .request(app)
      .post('/matches')
      .send(createMatche)
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJuYW1lIjoiQWRtaW4ifSwiaWF0IjoxNjc3NTkxODEwLCJleHAiOjE2Nzg0NTU4MTB9.49swV3jOhW_qumAUVQBQqRpTUsJkD1JMqeXxoV8VZmI',
      );

    expect(result.status).to.be.equal(201);
    expect(result.body).to.deep.equal(matcheListControl[1]);
  });

  it('Testa create do matche (dois times iguais)', async () => {
    sinon.stub(Model, 'create').resolves(matcheList[1]);

    const result = await chai
      .request(app)
      .post('/matches')
      .send(createMatcheErr)
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJuYW1lIjoiQWRtaW4ifSwiaWF0IjoxNjc3NTkxODEwLCJleHAiOjE2Nzg0NTU4MTB9.49swV3jOhW_qumAUVQBQqRpTUsJkD1JMqeXxoV8VZmI',
      );

    expect(result.status).to.be.equal(422);
    expect(result.body).to.deep.equal({
      message: 'It is not possible to create a match with two equal teams',
    });
  });

  it('Testa create do matche (caso de quando um id ou os dois nao existem)', async () => {
    sinon.stub(Model, 'findByPk').resolves(null);
    sinon.stub(Model, 'create').resolves(matcheList[1]);

    const result = await chai
      .request(app)
      .post('/matches')
      .send(createMatche)
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJuYW1lIjoiQWRtaW4ifSwiaWF0IjoxNjc3NTkxODEwLCJleHAiOjE2Nzg0NTU4MTB9.49swV3jOhW_qumAUVQBQqRpTUsJkD1JMqeXxoV8VZmI',
      );

    expect(result.status).to.be.equal(404);
    expect(result.body).to.deep.equal({
      message: 'There is no team with such id!',
    });
  });
});

// git commit -m 'feat: testes da cricao de uma matche implementadas'
