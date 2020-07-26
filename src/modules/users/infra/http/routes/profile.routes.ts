import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';


//verify if user are authenticated
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

// routes below need to be authenticate
profileRouter.use(ensureAuthenticated);

profileRouter.put('/', profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;


