import { ObjectSchema } from 'joi';
import { login } from './schema';
import ILogin from '../../interfaces/ILogin';

const validate = <T>(body: T, callback: ObjectSchema) => {
  const { error } = callback.validate(body);
  if (error) return error.message;
  return null;
};

const validateLogin = (body: ILogin) => validate<ILogin>(body, login);

const next = () => ({});

export { validateLogin, next };
