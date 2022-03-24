import Matchs from '../models/Matchs';
import Clubs from '../models/Clubs';
import { IResponse } from '../interfaces';

const prepareResponse = (
  success: boolean,
  code: number,
  message: string | object,
): IResponse => ({
  success,
  code,
  message,
});

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

export default {
  GetAll,
};
