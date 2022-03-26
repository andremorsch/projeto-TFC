import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matchs from '../database/models/Matchs';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testa Matchs', () => {
  const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ4MTUzOTE3fQ.H_YAT8eAUsd_QydYMQltc_DX0Ag_PEfOc9VkDLJoVkI';

  const inputPayload = {
    "homeTeam": 8,
    "awayTeam": 7,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
    "inProgress": true
  }

  describe('Testa rota ok', () => {
    before(() => {
      sinon.stub(Matchs, 'create').resolves(inputPayload as Matchs);
    });
  
    after(async () => {
      (Matchs.create as sinon.SinonStub).restore();
    })
  
    it('Testa rota com tudo ok', async () => {
      const response = await chai
        .request(app)
        .post('/matchs')
        .set('authorization', validToken)
        .send(inputPayload);
      
      expect(response.status).to.be.equal(201);
      
    });
  })
})