export interface IResponse {
  success: boolean,
  code: number,
  message: string | object | null,
}

export interface IUserLogin {
  email: string,
  password: string,
}

export interface IUser {
  id: number,
  username: string,
  role: string,
  email: string,
  password?: string,
}

export interface IMatch {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
}
