import { StatusCodes } from 'http-status-codes';
import findUsername from '../helpers/searchDatabase';
import ICreateUser from '../interfaces/ICreateUser';

const validateCreateUser = async (data: ICreateUser) => {
  const { username, password } = data;

  const usernameValidate = await findUsername(username);

  if (usernameValidate) {
    return {
      error: {
        code: StatusCodes.BAD_REQUEST,
        message: 'Esse usuário já existe',
      },
    };
  }

  if (!data) {
    return {
      error: {
        code: StatusCodes.BAD_REQUEST,
        message: 'Insira os dados do User',
      },
    };
  }

  if (username.trim().length < 3) {
    return {
      error: {
        code: StatusCodes.BAD_REQUEST,
        message: 'A senha deve ter pelo menos 3 digitos',
      },
    };
  }

  // Regex usado forum: https://pt.stackoverflow.com/questions/373574/regex-para-senha-forte
  const validate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?:([0-9a-zA-Z])(?!\1)){8,}$/gm;

  if (password.trim().length < 8) {
    return {
      error: {
        code: StatusCodes.BAD_REQUEST,
        message: 'A senha deve ter pelo menos 8 digitos',
      },
    };
  }
  if (!validate.test(password)) {
    return {
      error: {
        code: StatusCodes.BAD_REQUEST,
        message:
          'A senha deve ter no minimo um número, uma letra maiuscula e uma minuscula',
      },
    };
  }
};

export default validateCreateUser;
