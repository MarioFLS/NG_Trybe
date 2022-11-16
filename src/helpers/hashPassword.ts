import bcrypt from 'bcryptjs';
import ILogin from '../interfaces/ILogin';
import IUser from '../interfaces/IUser';
import findByUsername from './searchDatabase'

const salt = bcrypt.genSaltSync(10);

const hashPasswordDB = (password: string) => bcrypt.hashSync(password.trim(), salt);

const compareHashPassword = async (data: ILogin) => {
  const { username, password } = data;

  const findUser = await findByUsername(username)

  if (!findUser) return null;

  const user: IUser = findUser?.toJSON();
  return bcrypt.compareSync(password, user.password);
};

export default hashPasswordDB;
export { compareHashPassword }
