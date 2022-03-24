import { Request, Response } from 'express';
import ClubsServices from '../services/Clubs';

const GetAll = async (_req: Request, res: Response) => {
  const allClubs = await ClubsServices.GetAll();

  res.status(allClubs.code).json(allClubs.message);
};

export default {
  GetAll,
};
