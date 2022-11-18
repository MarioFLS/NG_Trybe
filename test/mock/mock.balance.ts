const balanceOne = {
  username: "Jorge",
  value: 20
}

const balanceTwo = {
  username: "Marcos",
  value: 20
}

const balanceFail = {
  username: "Jorge",
  value: 800
}

const tokenValidy = {
  username: 'Marcos',
  accountId: 1,
  id: 1,
}

const depositInValidy = {
  username: "Cezar",
    account: {
        id: 3,
        balance: "1028.00"
    }
}

const tokenFail = {
  username: 'Jorge',
  accountId: 1,
  id: 1,
}

export { balanceOne, tokenValidy, tokenFail, balanceFail, depositInValidy, balanceTwo }