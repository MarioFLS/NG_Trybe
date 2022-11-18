  const getBalance = {
  get: {
      tags: ['Vizualizar Saldo do usuário'],
      security: [
        {
          bearerAuth: [],
        },
      ],
    summary:
      'Permite Visualizar o Saldo',
    description:
      'Após inserir os dados corretamente: username e senha, seu saldo é visualiado',
    produces: ['application/json'],
    parameters: [
      {
        name: 'body',
        in: 'body',
        required: true,
        type: 'object',
      },
    ],
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'number',
                  example: 1,
                },
                balance: {
                  type: 'number',
                  example: 100.00,
                },
              },
            },
          },
        },
      },
    },
  },
};
export default getBalance;