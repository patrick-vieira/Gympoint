import * as Yup from 'yup';
import Students from '../models/Students';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email(),
      age: Yup.number()
        .required()
        .positive()
        .integer(),
      weight: Yup.number()
        .required()
        .positive(),
      height: Yup.number()
        .required()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const { email } = req.body;

    const studentExists = await Students.findOne({
      where: { email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Email already in use.' });
    }

    const student = await Students.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .required()
        .integer()
        .positive(),
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number()
        .positive()
        .integer(),
      weight: Yup.number().positive(),
      height: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const student = await Students.findByPk(req.body.id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found.' });
    }

    const { email } = req.body;

    if (email && student.email !== email) {
      const studentExists = await Students.findOne({
        where: { email: req.body.email },
      });

      if (studentExists) {
        return res.status(400).json({ error: 'Email already in use.' });
      }
    }

    const { name, age, weight, height } = await student.update(req.body);

    return res.json({ name, age, weight, height });
  }
}

export default new StudentController();
