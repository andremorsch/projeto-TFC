import { Request, Response } from 'express';
import MatchsServices from '../services/Matchs';

const GetAll = async (_req: Request, res: Response) => {
  const allMatchs = await MatchsServices.GetAll();

  res.status(allMatchs.code).json(allMatchs.message);
};

export default {
  GetAll,
};
