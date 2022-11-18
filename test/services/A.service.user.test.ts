import chai from 'chai';
import shell from 'shelljs';
import StatusCodes from 'http-status-codes';
import { createUser, loginUser } from '../../src/services/service.users';
import { failUser, fakeUser, invalidUserName, invalidUserPassword, userOne } from '../mock/mock.user';
const { expect } = chai;

beforeAll(() => shell.exec('npm run restore'));


describe('Teste de Service de Usuário', () => {
  describe('Criar Usuário', () => {
    it('Caso tenha sucesso', async () => {
      const user = await createUser(userOne);
      expect(user).to.deep.contains.keys('id', 'username');
    });

    it('Caso o usuário já exista', async () => {
      const user = await createUser(userOne);
      expect(user).to.deep.equal({
        error: {
          code: StatusCodes.BAD_REQUEST,
          message: 'Esse usuário já existe.',
        },
      });
    });

    it('O username deve ter no minimo 3 digitos', async () => {
      const user = await createUser(invalidUserName);
      expect(user).to.deep.equal({
        error: {
          code: StatusCodes.BAD_REQUEST,
          message: 'O username deve ter pelo menos 3 digitos.',
        },
      });
    });


    it('A senha deve ter pelo menos 8 digitos..', async () => {
      const user = await createUser(failUser);
      expect(user).to.deep.equal({
        error: {
          code: StatusCodes.BAD_REQUEST,
          message: 'A senha deve ter pelo menos 8 digitos.',
        },
      });
    });

    it('A senha deve ter no minimo um número, uma letra maiuscula e uma minuscula.', async () => {
      const user = await createUser(invalidUserPassword);
      expect(user).to.deep.equal({
        error: {
          code: StatusCodes.BAD_REQUEST,
          message: 'A senha deve ter no minimo um número, uma letra maiuscula e uma minuscula.',
        },
      });
    });
  });

  describe('Logar um Usuário', () => {
    it('Caso tenha sucesso', async () => {
      const user = await loginUser(userOne);
      expect(user).to.deep.contains.keys('token');
    });

    it('Caso tenha falha', async () => {
      const user = await loginUser(fakeUser);
      expect(user).to.deep.equal({
        error: {
          code: StatusCodes.BAD_REQUEST,
          message: 'Não existe usuário com esse username',
        },
      });
    });
  });
});
