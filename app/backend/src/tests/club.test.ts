import * as sinon from 'sinon';
import * as chai from 'chai';
import bcrypt = require('bcryptjs');
import chaiHttp = require('chai-http');

import { app } from '../app';
import Clubs from '../database/models/Clubs';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


describe('Testa Clubs', () => {
  
  describe('Testa rota /clubs', () => {
    const mockClubs = [
      {
        "id": 1,
        "clubName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "clubName": "Bahia"
      },
      {
        "id": 3,
        "clubName": "Botafogo"
      },
      {
        "id": 4,
        "clubName": "Corinthians"
      },
    ];

    before(() => {
      sinon.stub(Clubs, 'findAll').resolves(mockClubs as Clubs[]);
    });
  
    after(async () => {
      (Clubs.findAll as sinon.SinonStub).restore();
    })

    it('Testa rota ok', async () => {
      const response = await chai
      .request(app)
      .get('/clubs')

      expect(response.status).to.be.equal(200);
    })
  })

  describe('Testa rota /clubs/:id', () => {
    const mockClub = {
      "id": 1,
      "clubName": "Avaí/Kindermann"
    }

    before(() => {
      sinon.stub(Clubs, 'findOne').resolves(mockClub as Clubs);
    });
  
    after(async () => {
      (Clubs.findOne as sinon.SinonStub).restore();
    })

    it('Testa com id ok', async () => {
      const response = await chai
      .request(app)
      .get('/clubs/1')
      
      expect(response.status).to.be.equal(200);
    })
  })
})