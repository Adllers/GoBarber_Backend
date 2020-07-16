import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();
const sessionsController = new SessionsController();


sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;


