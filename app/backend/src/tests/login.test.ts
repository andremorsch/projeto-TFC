import * as sinon from 'sinon';
import * as chai from 'chai';
import bcrypt = require('bcryptjs');
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa Login', () => {

  const inputPayload1 = {
    email: "admin@admin.com",
    password: "secret_admin"
  };

  const outputPayload =  {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  }

  const outputPayload1 = {
    user: {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com'
    },
    token: 'eyJhbGciOiJIUzI1NiJ9.MQ.dQmeXYvGEvAIr4s20zDCeYcI0HxMZhp26RK-4zvGrhQ'
  };

  before(() => {
    sinon.stub(Users, 'findOne').resolves(outputPayload as Users);
    // sinon.stub(bcrypt, 'compareSync').returns(true);
  });

  after(async () => {
    (Users.findOne as sinon.SinonStub).restore();
    // (bcrypt.compare as sinon.SinonStub).restore();
  })
  
  it('Testa rota com tudo ok', async () => {
    const response = await chai
    .request(app)
    .post('/login')
    .send(inputPayload1);
    
    expect(response.status).to.be.equal(200);
    
  });
});
