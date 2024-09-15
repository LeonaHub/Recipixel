import Joi from 'joi';

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export const validateRegisterInput = (data: RegisterInput) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6)
  });

  return schema.validate(data);
};