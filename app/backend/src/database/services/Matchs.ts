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

const GetAll = async () => {
  try {
    const allMatchs = await Matchs.findAll({
      include: [
        { model: Clubs, as: 'homeClub', attributes: { exclude: ['id'] } },
        { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } },
      ],
    });

    return prepareResponse(true, 200, allMatchs);
  } catch (error) {
    return prepareResponse(false, 666, { message: 'Catch Error' });
  }
};

const Create = async (matchObj: IMatch, authorization: string) => {
  try {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = matchObj;
    await Jwt.verify(authorization, secret);
    await Clubs.findByPk(homeTeam);
    await Clubs.findByPk(awayTeam);

    console.log(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress);

    if (homeTeam === awayTeam) {
      return prepareResponse(false, 401, { message: 'Clubs must be different' });
    }

    if (!inProgress) {
      return prepareResponse(false, 401, { message: 'Match must be in progress' });
    }

    const match = await Matchs.create(matchObj);

    return prepareResponse(true, 200, match);
  } catch (error) {
    console.log(error);
    return prepareResponse(false, 401, { message: 'Catch Error - Token - Invalid Team' });
  }
};

export default {
  GetAll,
  Create,
};
