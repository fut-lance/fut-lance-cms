'use strict';
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::configuracao.configuracao', ({ strapi }) => ({
  async find(ctx) {
    const entries = await strapi.documents('api::configuracao.configuracao').findMany();
    if (entries && entries.length > 0) {
      return { data: { transmissoes_ativas: entries[0].transmissoes_ativas } };
    }
    return { data: { transmissoes_ativas: true } };
  },

  async update(ctx) {
    const { transmissoes_ativas } = ctx.request.body;
    const entries = await strapi.documents('api::configuracao.configuracao').findMany();
    if (entries && entries.length > 0) {
      const updated = await strapi.documents('api::configuracao.configuracao').update({
        documentId: entries[0].documentId,
        data: { transmissoes_ativas },
      });
      return { data: { transmissoes_ativas: updated.transmissoes_ativas } };
    }
    return { data: { transmissoes_ativas } };
  },
}));
