const cashOut = {
  post: {
    tags: ['Fazer uma trânsferência'],
    security: [
      {
        bearerAuth: [],
      },
    ],
    summary:
      'Permite o usuário transferir ',
    description:
      'Após inserir os dados corretamente: username e senha, a trasnferência será realizada. Não possui resposta no corpo da requisição',
    produces: ['application/json'],
    parameters: [
      {
        name: 'body',
        in: 'body',
        required: true,
        type: 'object',
        properties: {
          username: {
            type: 'string',
          },
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
              username: {
                type: 'string',
                example: 'Nome de outro Usuário',
              },
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
        description: 'ACCEPETED',
      },
    },
  },
};
export default cashOut;