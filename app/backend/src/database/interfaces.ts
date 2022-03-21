export interface IResponse {
  success: boolean,
  code: number,
  message: string | object | null,
}

export interface IUserLogin {
  username: string,
  password: string,
}

export interface IUser {
  id: number,
  username: string,
  role: string,
  email: string,
  password?: string,
}
