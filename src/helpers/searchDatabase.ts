import Users from '../database/models/users';

const findUsername = async (username: string) => Users.findOne({ where: { username } });

export default findUsername;
