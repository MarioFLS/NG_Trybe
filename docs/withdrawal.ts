const withdrawal = {
  post: {
      tags: ['Saldo'],
      security: [
        {
          bearerAuth: [],
        },
      ],
    summary:
      'Permite sacar um valor da sua conta',
    description:
      'Após inserir os dados corretamente: o token e o valor, seu saldo é visualiado.',
    produces: ['application/json'],
    parameters: [
      {
        name: 'body',
        in: 'body',
        required: true,
        type: 'object',
        properties: {
          value: {
            type: 'number',
          },
        },
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              value: {
                type: 'number',
                example: 20,
              },
            },
          },
        },
      },
    },
    responses: {
      202: {
        description: 'ACCEPTED',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                value: {
                  type: 'number',
                  exemple: 200
                },
              },
            },
          },
        },
      },
    },
  },
};
export default withdrawal;