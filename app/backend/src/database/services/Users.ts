import Jwt = require('jsonwebtoken');
import bcrypt = require('bcryptjs');
import { IResponse, IUserLogin, IUser } from '../interfaces';
import Users from '../models/Users';

const prepareResponse = (
  success: boolean,
  code: number,
  message: string | object,
): IResponse => ({
  success,
  code,
  message,
});

const secret = 'super_senha';

// const validateUsername = (username: string): IResponse => {
//   if (!username) return prepareResponse(false, 400, { error: 'Username is required' });
//   if (typeof username !== 'string') {
//     return prepareResponse(false, 422, { error: 'Username must be a string' });
//   }
//   if (username.length < 3) {
//     return prepareResponse(false, 422, { error: 'Username must be longer than 2 characters' });
//   }

//   return prepareResponse(true, 250, '');
// };

// const validatePassword = (password: string): IResponse => {
//   if (!password) return prepareResponse(false, 400, { error: 'Password is required' });
//   if (typeof password !== 'string') {
//     return prepareResponse(false, 422, { error: 'Password must be a string' });
//   }
//   if (password.length < 9) {
//     return prepareResponse(false, 422, { error: 'Password must be longer than 7 characters' });
//   }

//   return prepareResponse(true, 250, '');
// };

// const validateLogin = (userToLoginValid: IUser | null, email: string, password: string) => {
//   if (!userToLoginValid) return prepareResponse(false, 400, { error: 'Login invalid' });
//   if (email === userToLoginValid.email && password === userToLoginValid.password) {
//     return prepareResponse(true, 200, userToLoginValid);
//   }
//   return prepareResponse(false, 400, { error: 'Login invalid' });
// };

const doLogin = async (userToLogin: IUserLogin): Promise<IResponse> => {
  const { email, password } = userToLogin;

  if (!email) { return prepareResponse(false, 400, { error: 'Invalid Email' }); }
  if (!password) { return prepareResponse(false, 400, { error: 'Invalid password' }); }

  const userToLoginValid = await Users.findOne({
    where: { email },
    // attributes: { exclude: ['password'] },
  });

  if (!userToLoginValid) {
    return prepareResponse(false, 400, { error: 'User not Found' });
  }

  const comparePass = await bcrypt.compare(password, userToLoginValid.password);
  if (!comparePass) { return prepareResponse(false, 400, { error: 'Invalid Password' }); }

  // const loginResp = validateLogin(userToLoginValid, email, password);
  // if (!loginResp.success) return loginResp;

  const token = await Jwt.sign({ email, password }, secret);

  const user2: IUser | null = await Users.findOne({
    where: { email },
    attributes: { exclude: ['password'] },
  });

  return prepareResponse(true, 200, { user: user2, token });
};

export default {
  doLogin,
};
