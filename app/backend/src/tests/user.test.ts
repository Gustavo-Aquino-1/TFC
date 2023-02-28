import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';

import { app } from '../app';
import User from '../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {

  beforeEach(sinon.restore);

  const userList = [
    new User({
      id: 10,
      username: 'Gustavo Aquino',
      role: 'admin',
      email: 'gust@dev.ma',
      password: 'mypassword'
    })
  ]

  const userListControl = [
    {
      id: 10,
      username: 'Gustavo Aquino',
      role: 'admin',
      email: 'gust@dev.ma',
      password: 'mypassword'
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

  it('Testa user login', async () => {
    const body = { email: 'gust@dev.ma', password: 'mypassword'}
    sinon.stub(Model, 'findAll').resolves([userList[0]]);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const result = await chai.request(app).post('/login').send(body);

    expect(result.status).to.be.equal(200);
    expect(result.body).to.haveOwnProperty('token')
    
  });
});
