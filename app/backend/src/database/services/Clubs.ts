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
    const allClubs = await Clubs.findAll();
    console.log(allClubs);
    return prepareResponse(true, 200, allClubs);
  } catch (error) {
    return prepareResponse(false, 666, { message: 'Catch Error' });
  }
};

const GetById = async (id: number) => {
  if (!id) {
    return prepareResponse(false, 404, { message: 'Need a real number' });
  }

  const club = await Clubs.findOne({ where: { id } });
  if (club) {
    return prepareResponse(true, 200, club);
  }

  return prepareResponse(true, 404, { message: 'Dont have a club with this id' });
};

export default {
  GetAll,
  GetById,
};
