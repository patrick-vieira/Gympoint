
# JWT setup

  we will use JWT as

## 1º Password encrypt

  To encrypt user password on our database we will use `bcryptjs`.

  > yarn add bcryptjs


## BeforeSave hook

  Now on our User model we can encrypt user password using the beforeSave hook, this hook call a funcition before any modification insertion or update on Users table.

  And create a function to validate the password to.

  ```js

  import Sequelize, { Model } from 'sequelize';
  import bcrypt from 'bcrypt';

  class User extends Model {
    static init(sequelize) {
      super.init(
        {
          name: Sequelize.STRING,
          email: Sequelize.STRING,
          password: Sequelize.VIRTUAL, // virtual field is not a column
          password_hash: Sequelize.STRING,
          provider: Sequelize.BOOLEAN,
        },
        {
          sequelize,
        }
      );

      this.addHook('beforeSave', async user => {
        if (user.password) {
          user.password_hash = await bcrypt.hash(user.password, 8);
        }
      });
    }

    checkPassword(password) {
      return bcrypt.compare(password, this.password_hash);
    }
  }

  export default User;

  ```


## 2º JWT

  install package
  > yarn add jsonwebtoken

  first we create a new controller to manage our User sessions, I will use a new controller insted of User controller to separete concerns couse we will create sessions a completly diferent entity.

  and i think it's a good practice to have only one of each one of this methos per controller: index, store, show, update, delete.



````js
import jwt from 'jsonwebtoken';

import User from '../models/Users';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name, role } = user;

    const payload = { id, name, role };

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign(payload, 'secretHash', {
        expiresIn: '15m',
      }),
    });
  }
}

export default new SessionController();
````

## auth middleware

  to block users from access page if not loged in we must validate the user token, for that we can create a middleware and call it before the routes that are specific for users loged in.


  ````js
  import jwt from 'jsonwebtoken';
  import { promisify } from 'util';

  import authConfig from '../../config/auth';

  export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);
      req.userId = decoded.id; // this way we can access the user id without pass the id in the url

      return next();
    } catch (err) {
      return res.status(401).json({ error: err });
    }
  };
  ````

  our routes will be like that:

  ````js
  import { Router } from 'express';
  import UserController from './app/controllers/UserController';
  import SessionController from './app/controllers/SessionController';

  import authMiddleware from './app/middlewares/auth';

  const routes = new Router();

  routes.post('/users', UserController.store);
  routes.post('/sessions', SessionController.store);

  routes.use(authMiddleware);

  routes.put('/users', UserController.update);

  export default routes;

  ````

  and our UserController like that:

  ````js
  import User from '../models/Users';

  class UserController {
    async store(req, res) {
      const userExists = await User.findOne({ where: { email: req.body.email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const { id, name, email, role } = await User.create(req.body);

      return res.json({ id, name, email, role });
    }

    async update(req, res) {
      const { email, oldPassword } = req.body;

      const user = await User.findByPk(req.userId);

      if (email && user.email !== email) {
        const userExists = await User.findOne({
          where: { email: req.body.email },
        });

        if (userExists) {
          return res.status(400).json({ error: 'Email already in use.' });
        }
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Password does not match.' });
      }

      const { id, name, role } = await user.update(req.body);

      return res.json({ id, name, email, role });
    }
  }

  export default new UserController();
  ´´´´
