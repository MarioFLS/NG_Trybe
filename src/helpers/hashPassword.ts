import bcrypt from 'bcryptjs';

const hashPasswordDB = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password.trim(), salt);
};

export default hashPasswordDB;
