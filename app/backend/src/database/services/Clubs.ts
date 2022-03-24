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

export default {
  GetAll,
};
