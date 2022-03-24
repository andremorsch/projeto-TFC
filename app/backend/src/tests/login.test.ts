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

  const inputPayload = {
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

  const tokenJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ4MDY1Njc0fQ.zDnyoUc0-L7NpJ-3HRXs1nX5sO1Ui0PWn8AdcLtdru8'

  describe('Rota /login', () => {
    before(() => {
      sinon.stub(Users, 'findOne').resolves(outputPayload as Users);
    });
  
    after(async () => {
      (Users.findOne as sinon.SinonStub).restore();
    })

    it('Testa rota com tudo ok', async () => {
      const response = await chai
      .request(app)
      .post('/login')
      .send(inputPayload);
      
      expect(response.status).to.be.equal(200);
      
    });
  })
    

  describe('Testa rota /login/validate', () => {
    before(() => {
      sinon.stub(Users, 'findOne').resolves(outputPayload as Users);
    });
  
    after(async () => {
      (Users.findOne as sinon.SinonStub).restore();
    })
    
    it('Testa rota com auth correto', async () => {
      const response = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', tokenJwt)

      expect(response.status).to.be.equal(200);
    })
  })
});
