import chai from 'chai';
import StatusCodes from 'http-status-codes';
import { userCashOut, userDepoist, userWithdrawal } from '../../src/services/service.balance';
import { balanceFail, balanceOne,  tokenFail, tokenValidy } from '../mock/mock.balance';

const { expect } = chai;

describe('Teste de Service de Balance', () => {
  describe('Criar Usuário', () => {
    it('Caso o usuário esteja tentando se enviar dinheiro', async () => {
      const user = await userCashOut(tokenFail, balanceOne);
      expect(user).to.deep.equal({
        error: {
          code: StatusCodes.NOT_ACCEPTABLE,
          message: 'Você não pode transferir dinheiro para si mesmo!',
        },
      });
    });

    it('Caso não possua dinheiro o suficiente', async () => {
      const user = await userCashOut(tokenValidy, balanceFail);
      expect(user).to.deep.equal({
        error: {
          code: StatusCodes.UNAUTHORIZED,
          message: `Seu saldo é inferior a ${balanceFail.value}!`,
        },
      });
    });

    it('Depositar o dinheiro na conta', async () => {
      const { dataValues } = await userDepoist(tokenValidy, 200) as any;
      expect(dataValues).to.deep.contains.keys("username", "account");
    });

    it('Tentar sacar mais dinheiro do que você possui', async () => {
      const balance = await userWithdrawal(tokenValidy, 1000);
      expect(balance).to.deep.equal({
        error: {
          code: StatusCodes.NOT_ACCEPTABLE,
          message: 'Você não pode tentar sacar mais dinheiro do que você tem. '
          + 'Infelizmente',
        },
      });;
    });

    it('Sacar dinheiro', async () => {
      const { dataValues } = await userWithdrawal(tokenValidy, 20) as any;
      expect(dataValues).to.deep.contains.keys("username", "account");
    });
  });
});
