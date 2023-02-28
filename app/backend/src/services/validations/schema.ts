import * as joi from 'joi';

const login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const next = joi.object({});

export { login, next };
