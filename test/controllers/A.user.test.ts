import chai from 'chai';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import shell from 'shelljs';
import { StatusCodes } from 'http-status-codes';
import { userOne, userTwo } from '../mock/mock.user';
import "dotenv/config";
import { balanceTwo } from '../mock/mock.balance';

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const port = process.env.APP_PORT || 3005;
const url = `http://localhost:${port}`

beforeAll(async () => shell.exec('npm run restore'))


describe("Teste de controller do Usuário ", () => {

  const loginUser = async () => await chai
    .request(url)
    .post('/login')
    .send(userOne);


  it("Criando usuário", async () => {
    const response = await chai
      .request(url)
      .post('/')
      .send(userOne);

    await chai
      .request(url)
      .post('/')
      .send(userTwo);
    expect(response).to.have.status(StatusCodes.CREATED);
    expect(response.body).to.deep.contains.keys("token");
  });

  it("Usuário Já existe", async () => {
    const response = await chai
      .request(url)
      .post('/')
      .send(userOne);

    expect(response).to.have.status(StatusCodes.BAD_REQUEST);
    expect(response.body).to.deep.equal({ "message": "Esse usuário já existe." });
  });

  it("Login do usuário", async () => {
    const response = await chai
      .request(url)
      .post('/login')
      .send(userOne);

    expect(response).to.have.status(StatusCodes.OK);
    expect(response.body).to.deep.contains.keys("token");
  });

  it("Realizar Transferência", async () => {

    const response = await chai
      .request(url)
      .post('/cashOut')
      .set('Authorization', (await loginUser()).body.token)
      .send(balanceTwo);
    expect(response).to.have.status(StatusCodes.ACCEPTED);
  });

  it("Historico de Transação", async () => {
    const response = await chai
      .request(url)
      .get('/transactions')
      .set('Authorization', (await loginUser()).body.token)
    expect(response).to.have.status(StatusCodes.OK);
    expect(response.body[0]).to.deep.contains({
      id: 1,
      debitedAccountId: 1,
      creditedAccountId: 2,
      value: "20",
    })
  });

  it("Historico de Transação Por tipo - out", async () => {
    const response = await chai
      .request(url)
      .get('/transactions?type=out')
      .set('Authorization', (await loginUser()).body.token)
    expect(response).to.have.status(StatusCodes.OK);
    expect(response.body[0]).to.deep.contains({
      id: 1,
      debitedAccountId: 1,
      creditedAccountId: 2,
      value: "20",
    })
  });

  it("Historico de Transação Por tipo - in", async () => {
    const response = await chai
      .request(url)
      .get('/transactions?type=in')
      .set('Authorization', (await loginUser()).body.token)
    expect(response).to.have.status(StatusCodes.OK);
    expect(response.body).to.have.length(0);
  });
});