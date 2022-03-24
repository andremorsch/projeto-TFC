import { Request, Response } from 'express';
import MatchsServices from '../services/Matchs';

const GetAll = async (_req: Request, res: Response) => {
  const allMatchs = await MatchsServices.GetAll();

  res.status(allMatchs.code).json(allMatchs.message);
};

const Create = async (req: Request, res: Response) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
  const authorization = req.headers.authorization || '';

  const matchObj = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress };
  const match = await MatchsServices.Create(matchObj, authorization);

  res.status(match.code).json(match.message);
};

export default {
  GetAll,
  Create,
};
