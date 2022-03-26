import { Request, Response } from 'express';
import LeaderboardsServices from '../services/Leaderboards';

const GetAll = async (_req: Request, res: Response) => {
  const allClubs = await LeaderboardsServices.GetAll();

  res.status(allClubs.code).json(allClubs.message);
};

export default {
  GetAll,
};
