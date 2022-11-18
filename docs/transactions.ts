const transaction = {
  get: {
    tags: ['Transação'],
    security: [
      {
        bearerAuth: [],
      },
    ],
    summary: 'Permite visualizar todas as suas transações.',
    description: 'Visualiza todas as transações, sem filtros.',
    produces: ['application/json'],
    parameters: [
      {
        name: 'type',
        in: 'query',
        description:
          'Transferências de tipo cashIn ou CashOut recebidas ou depositas - remova se não quiser usar',
        required: false,
        type: 'string',
        example: 'in ou out',
      },

      {
        name: 'body',
        in: 'body',
        required: false,
        description:
          'Transferências por data, pode ser mesclada com as outras. Tente usar no postman ou similar. Ele não está funcionando por aqui.',
        type: 'object',
        properties: {
          date: {
            type: 'string',
          },
        },
      },
    ],
    responses: {
      202: {
        description: 'ACCEPTED',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'number',
                    exemple: 1,
                  },
                  debitedAccountId: {
                    type: 'number',
                    exemple: 2,
                  },
                  creditedAccountId: {
                    type: 'number',
                    exemple: 1,
                  },
                  value: {
                    type: 'number',
                    exemple: 20,
                  },
                  createdAt: {
                    type: 'string',
                    exemple: Date.now(),
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default transaction;
