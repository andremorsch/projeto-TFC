import Jwt = require('jsonwebtoken');
import Matchs from '../models/Matchs';
import Clubs from '../models/Clubs';
import { IResponse, IMatch } from '../interfaces';

const prepareResponse = (
  success: boolean,
  code: number,
  message: string | object,
): IResponse => ({
  success,
  code,
  message,
});

const secret = 'super_senha';
const messageError1 = 'It is not possible to create a match with two equal teams';

const existClub = async (homeTeam: number, awayTeam: number) => {
  try {
    const homeClub = await Clubs.findByPk(homeTeam);
    const awayClub = await Clubs.findByPk(awayTeam);
    if (!homeClub || !awayClub) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

const GetAll = async () => {
  const allMatchs = await Matchs.findAll({
    include: [
      { model: Clubs, as: 'homeClub', attributes: { exclude: ['id'] } },
      { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } },
    ],
  });

  return prepareResponse(true, 200, allMatchs);
};

const Create = async (matchObj: IMatch, authorization: string) => {
  try {
    const { homeTeam, awayTeam, inProgress } = matchObj;
    await Jwt.verify(authorization, secret);
    
    if (homeTeam === awayTeam) {
      return prepareResponse(false, 401, { message: messageError1 });
    }
    if (await existClub(homeTeam, awayTeam) === false) {
      return prepareResponse(false, 401, { message: 'There is no team with such id!' });
    }
    if (!inProgress) {
      return prepareResponse(false, 401, { message: 'Match must be in progress' });
    }

    const match = await Matchs.create(matchObj);

    return prepareResponse(true, 201, match);
  } catch (error) {
    return prepareResponse(false, 401, { message: 'Invalid Token' });
  }
};

export default {
  GetAll,
  Create,
};
