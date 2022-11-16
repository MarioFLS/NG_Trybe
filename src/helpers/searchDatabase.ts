import Users from '../database/models/users';

const findByUsername = async (username: string) => Users.findOne({ where: { username } });

export default findByUsername;
