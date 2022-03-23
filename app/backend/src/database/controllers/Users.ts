import { Request, Response } from 'express';
import UsersServices from '../services/Users';
import { IUserLogin } from '../interfaces';

const Login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const userToLogin: IUserLogin = { email, password };

  const doLogin = await UsersServices.doLogin(userToLogin);
  res.status(doLogin.code).json(doLogin.message);
};

const LoginValidate = async (req: Request, res: Response): Promise<void> => {
  const { authorization } = req.headers;

  const validateLogin = await UsersServices.validateLogin(authorization);

  res.status(validateLogin.code).json(validateLogin.message);
};

export default {
  Login,
  LoginValidate,
};
