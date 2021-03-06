import * as express from 'express';
import * as cors from 'cors';
import UsersControllers from './database/controllers/Users';
import ClubsControllers from './database/controllers/Clubs';
import MatchsController from './database/controllers/Matchs';
import LeaderboardsController from './database/controllers/Leaderboards';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(cors());
    // ...
    this.app.post('/login', UsersControllers.Login);
    this.app.get('/login/validate', UsersControllers.LoginValidate);
    this.app.get('/clubs', ClubsControllers.GetAll);
    this.app.get('/clubs/:id', ClubsControllers.GetById);
    this.app.route('/matchs').get(MatchsController.GetAll).post(MatchsController.Create);
    this.app.patch('/matchs/:id/finish', MatchsController.Finish);
    this.app.patch('/matchs/:id', MatchsController.Update);
    this.app.get('/leaderboard/home', LeaderboardsController.GetAll);
  }

  // ...
  public start(PORT: string | number):void {
    // ...
    this.app.listen(PORT, () => {
      console.log(`Rodando na porta ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
