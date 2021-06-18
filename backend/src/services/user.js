import User from '@app/models/user';
import Logger from '@app/utils/logger';

const logger = new Logger('Controller', 'user.js');

const getAll = async () => {
  try {
    return await User.find();
  }
  catch (err) {
    throw new Error(`getAll Err: ${err}`);
  }
};

const createOne = async (data) => {
  try {
    await User.create(data);
  }
  catch (err) {
    throw new Error(`createOne Err: ${err}`);
  }
};

const findByEmail = async (email) => {
  try {
    return await User.find(email);
  }
  catch (err) {
    throw new Error(`findByEmail Err: ${err}`);
  }
};

const findById = async (id) => {
  try {
    return await User.findById(id);
  }
  catch (err) {
    throw new Error(`findById Err: ${err}`);
  }
};

const deleteById = async (id) => {
  try {
    return await User.findByIdAndDelete(id, { active: false });
  }
  catch (err) {
    throw new Error(`deleteById Err: ${err}`);
  }
};

const queryFilterSort = async (q) => {
  const queryCopyObj = { ...q };

  delete queryCopyObj.sort;

  const queryStr = JSON.stringify(queryCopyObj);
  const replaceQueryStr = queryStr.replace(/\b(gt|lt|lte|gte)\b/g, (m) => `$${m}`);

  try {
    let query = User.find(JSON.parse(replaceQueryStr));
    if (q.sort) {
      query = query.sort(q.sort);
    }

    return await query;
  }
  catch (err) {
    throw new Error(`getAll Err: ${err}`);
  }
};

const putImage = async (id, img) => {
  try {
    return await User.findByIdAndUpdate(id, { img });
  }
  catch (err) {
    throw new Error(`getAll Err: ${err}`);
  }
};

const register = async (data) => {
  await createOne(data);
};

const login = async (body) => {
  const data = { ...body };
  try {
    return await findByEmail({ email: data.email });

  }
  catch (err) {
    logger.error(err);

    return false;
  }
};

export {
  getAll,
  createOne,
  findByEmail,
  findById,
  deleteById,
  queryFilterSort,
  putImage,
  register,
  login
};