# yup

yup is a library for  schema validation, with funcitons we validate the fields from our input

> yarn add yup


``` js
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(6)
      .required(),
    confirmPassword: Yup.string().when('password', (password, field) => {
      return password ? field.required().oneOf([Yup.ref('password')]) : field;
    }),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation fails' });
  }
```
