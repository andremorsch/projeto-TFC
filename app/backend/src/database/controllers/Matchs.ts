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

const Finish = async (req: Request, res: Response) => {
  const { id } = req.params;
  const toFinish = await MatchsServices.Finish(Number(id));
  res.status(toFinish.code).json(toFinish.message);
};

const Update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const toUpdate = await MatchsServices.Update(Number(id), homeTeamGoals, awayTeamGoals);
  res.status(toUpdate.code).json(toUpdate.message);
};

export default {
  GetAll,
  Create,
  Finish,
  Update,
};
