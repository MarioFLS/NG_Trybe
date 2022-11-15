import Users from '../database/models/users';

const findUsername = async (username: string) => {
  return Users.findOne({ where: { username } });
};

export { findUsername };
