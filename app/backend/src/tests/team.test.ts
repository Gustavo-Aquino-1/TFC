import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';

import { app } from '../app';
import TeamService from '../services/team.service';
import Team from '../database/models/Team';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  const TeamList = [
    new Team({
      id: 10,
      teamName: 'Corinthians' 
    }),
    new Team({
      id: 11,
      teamName: 'Palmeiras' 
    })
  ]

  const TeamListControl = [
    {
      id: 10,
      teamName: 'Corinthians' 
    },
    {
      id: 11,
      teamName: 'Palmeiras' 
    }
  ]

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

  it('Testa team get', async () => {
    sinon.stub(Model, 'findAll').resolves(TeamList);

    const result = await chai.request(app).get('/teams');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal(TeamListControl);
    
  });

  it('Testa team getById', async () => {
    sinon.stub(Model, 'findByPk').resolves(TeamList[0]);

    const result = await chai.request(app).get('/teams/1');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal(TeamListControl[0]);
  });
});
