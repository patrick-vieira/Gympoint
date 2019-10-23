import User from '../models/Users';

class UserController {
  async store(req, res) {
    const user = await User.create(req.body);

    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email, role } = user;

    return res.json({ id, name, email, role });
  }
}

export default new UserController();
