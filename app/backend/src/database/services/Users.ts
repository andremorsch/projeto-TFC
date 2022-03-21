import Jwt = require('jsonwebtoken');
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

const validateLogin = (userToLoginValid: IUser | null, username: string, password: string) => {
  if (!userToLoginValid) return prepareResponse(false, 400, 'Login invalid');
  if (username === userToLoginValid.username && password === userToLoginValid.password) {
    return prepareResponse(true, 200, userToLoginValid);
  }
  return prepareResponse(false, 400, 'Login invalid');
};

const doLogin = async (userToLogin: IUserLogin): Promise<IResponse> => {
  const { username, password } = userToLogin;

  // const usernameResp = validateUsername(username);
  // const passwordResp = validatePassword(password);

  // if (!usernameResp.success) return usernameResp;
  // if (!passwordResp.success) return passwordResp;

  const userToLoginValid: IUser | null = await Users.findOne({
    where: { username },
    // attributes: { exclude: ['password'] },
  });

  const loginResp = validateLogin(userToLoginValid, username, password);
  if (!loginResp.success) return loginResp;

  const token = await Jwt.sign({ username, password }, secret);

  if (userToLoginValid !== null) {
    const user2: IUser = {
      id: userToLoginValid.id,
      username: userToLoginValid.username,
      role: userToLoginValid.role,
      email: userToLoginValid.email,
    };
    return prepareResponse(true, 200, { user: user2, token });
  }

  return prepareResponse(true, 666, { user: userToLoginValid, token });
};

export default {
  doLogin,
};
