import { Router } from 'express';
import multer from 'multer'; //upload files
import uploadConfig from '@config/upload';


import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

//verify if user are authenticated
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);



usersRouter.post('/', usersController.create);

// using ensureauthenticated
usersRouter.patch('/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;


