import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    if (!publicRole) {
      strapi.log.warn('Public role not found, skipping permission setup');
      return;
    }

    const apiActions = [
      'api::categoria.categoria.find',
      'api::categoria.categoria.findOne',
      'api::noticia.noticia.find',
      'api::noticia.noticia.findOne',
      'api::transmissao.transmissao.find',
      'api::transmissao.transmissao.findOne',
      'api::comentario.comentario.find',
      'api::comentario.comentario.findOne',
      'api::comentario.comentario.create',
    ];

    for (const action of apiActions) {
      const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
        where: {
          action,
          role: publicRole.id,
        },
      });

      if (!existing) {
        await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action,
            role: publicRole.id,
          },
        });
        strapi.log.info(`Granted public access: ${action}`);
      }
    }

    strapi.log.info('Public API permissions configured successfully');
  },
};
