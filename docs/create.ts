const create = {
  post: {
    tags: ['Usuário'],
    summary:
      'Permite a criação de um novo usuário',
    description:
      'Após inserir os dados corretamente: username e password. Seu usuário é criado',
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
          password: {
            type: 'string',
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
                example: 'SeuNome',
              },
              password: {
                type: 'string',
                example: '12345678bC',
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                  example:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpUZXh0byIsImlhdCI6MTUxN',
                },
              },
            },
          },
        },
      },
      400: {
        description: 'BAD REQUEST',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Esse usuário já existe.'
                },
              },
            },
          },
        },
      },
    },
  },
};

export default create;