import { Request, Response } from 'express';
import ClubsServices from '../services/Clubs';

const GetAll = async (_req: Request, res: Response) => {
  const allClubs = await ClubsServices.GetAll();

  res.status(allClubs.code).json(allClubs.message);
};

const GetById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const idNumber = Number(id);

  const clubById = await ClubsServices.GetById(idNumber);

  res.status(clubById.code).json(clubById.message);
};

export default {
  GetAll,
  GetById,
};
