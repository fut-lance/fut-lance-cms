import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.log.info('FUT LANCE CMS carregado');

    await seedPermissions(strapi);
  },
};

async function seedPermissions(strapi: any) {
  try {
    const pluginStore = strapi.store({
      type: 'plugin',
      name: 'users-permissions',
    });

    const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    if (!publicRole) {
      strapi.log.warn('Public role not found');
      return;
    }

    const actions = [
      'api::categoria.categoria.find',
      'api::categoria.categoria.findOne',
      'api::categoria.categoria.create',
      'api::noticia.noticia.find',
      'api::noticia.noticia.findOne',
      'api::noticia.noticia.create',
      'api::noticia.noticia.update',
      'api::transmissao.transmissao.find',
      'api::transmissao.transmissao.findOne',
      'api::transmissao.transmissao.create',
      'api::comentario.comentario.find',
      'api::comentario.comentario.findOne',
      'api::comentario.comentario.create',
    ];

    let created = 0;

    for (const action of actions) {
      const existing = await strapi.db.query('plugin::users-permissions.permission').count({
        where: {
          action,
          role: { id: publicRole.id },
        },
      });

      if (existing === 0) {
        await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action,
            role: publicRole.id,
          },
        });
        created++;
        strapi.log.info(`Created permission: ${action}`);
      }
    }

    strapi.log.info(`Permissions setup complete. ${created} new permissions created.`);
  } catch (error: any) {
    strapi.log.error(`Permission seed error: ${error.message}`);
  }
}
