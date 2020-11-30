import { Router } from 'express';
import { getConnection, getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import User from '../models/user';
import { registerSchema } from "../validation";
//import { logIn } from '../auth';

const router = Router();

router.post('/register', async (req, res) => {
  await registerSchema.validateAsync(req.body, { abortEarly: false});

  const { email, name, password } = req.body;
  
  const found = await getRepository(User).findOne({email: email});

  if (found) {
    throw new Error('Invalid email');
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await getRepository(User).save({ email, password: hashedPassword, salt, name});
  
  //logIn(req, user.id);

  res.send(user);

});

export default router;
