import {
  getAll,
  createOne,
  findById,
  queryFilterSort,
  deleteById,
  putImage,
  login,
  register,
} from '@app/services/user';
import jwt from 'jsonwebtoken';

import Logger from '@app/utils/logger';
import { getHash } from '@app/utils/password';

const logger = new Logger('Routes', 'user.js');

const getUser = async (req, res) => {
  logger.debug('User GET All');

  try {
    const keys = Object.keys(req.query);
    if (keys.length) {
      logger.silly(JSON.stringify(req.query, null, 2));
      const result = await queryFilterSort(req.query);
      res.end(JSON.stringify(result, null, 2));

      return;
    }
    logger.info(JSON.stringify(req.query));
    const users = await getAll();
    res.end(JSON.stringify(users, null, 2));
  }
  catch (err) {
    res.status(500).json({
      status: 'failed',
      error: err,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const data = req.user;
    logger.info(JSON.stringify(data, null, 2));
    await createOne(data);
    res.end(JSON.stringify({ status: 'ok' }));
  }
  catch (err) {
    res.status(500).json({
      status: 'failed',
      error: err,
    });
  }
};

const findUserById = async (req, res) => {
  try {
    logger.info(req.params.id);
    const result = await findById(req.params.id);
    res.end(JSON.stringify(result, null, 2));
  }
  catch (err) {
    res.end(JSON.stringify(err));
  }
};

const deleteUserById = async (req, res) => {
  await deleteById(req.params.id);
  res.end(JSON.stringify({ status: 'deleted' }, null, 2));
};

const storeUserImage = async (req, res) => {
  const { id } = req.params;
  const files = [];
  const arr = Object.entries(req.files);
  for (const [, v] of arr) {
    const data = v.data && Buffer.from(v.data).toString('base64');
    files.push({
      id,
      name: v.name,
      data,
    });
  }

  const firstImg = files.length && files[0];
  try {
    await putImage(id, firstImg.data);

    res.json({ ok: true, img: firstImg.data });
  }
  catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};


const registerUser = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(401).json({
        err: 'Email and Password are required',
      });

      return;
    }
    const data = { ...req.body };
    data.password = await getHash(data.password);
    await register(data);
    res.json({ status: 'ok' });
  }
  catch (err) {
    res.end(JSON.stringify({ err: err.message }));
  }
};

const loginUser = async (req, res) => {
  if (!req.body.email && !req.body.password) {
    res.status(401).json({
      err: 'Email and Password are required',
    });

    return;
  }
  const user = await login(req.body);
  if (user?.[0]?.password) {
    const passMatched = getHash(req?.body?.password) === user?.[0]?.password;
    if (passMatched) {
      const token = jwt.sign({ id: user?.[0]?._id?.toString() }, 'randomTokenSecretKey123', { expiresIn: '2h' });

      res.header('authorization', token).json({
        status: 'ok',
      });

      return;
    }
  }
  res.status(401).json({
    err: 'Login failed!',
  });
};

export {
  getUser,
  createUser,
  findUserById,
  deleteUserById,
  storeUserImage,
  registerUser,
  loginUser
};