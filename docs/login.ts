const login = {
  post: {
    tags: ['Usuário'],
    summary:
      'Permite fazer Login como usuário e retornar um token com suas informações',
    description:
      'Após inserir os dados corretamente: username e senha, é gerado um token com algumas informações',
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
      200: {
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
                  example: 'Não existe usuário com esse username'
                },
              },
            },
          },
        },
      },
    },
  },
};

export default login;