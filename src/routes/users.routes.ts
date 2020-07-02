import { Router } from 'express';
import multer from 'multer'; //upload files
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

//verify if user are authenticated
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);


usersRouter.post('/', async (request, response) => {

    const {name, email, password} = request.body;

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      email,
      password
    });

    delete user.password;

    return response.send(user);

});

// using ensureauthenticated
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'),

  async(request, response) => {

      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      })
      // password out from response
      delete user.password;

      return response.json(user);

})


export default usersRouter;


