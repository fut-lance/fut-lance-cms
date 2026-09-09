'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/configuracao',
      handler: 'configuracao.find',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/configuracao',
      handler: 'configuracao.update',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
