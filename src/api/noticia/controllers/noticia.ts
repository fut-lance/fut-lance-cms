import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::noticia.noticia', ({ strapi }) => ({
  async find(ctx) {
    const sanitizer = this.sanitizeQuery;
    const query = await sanitizer(ctx);
    const populate = query.populate || {};
    populate.categoria = true;
    const results = await strapi.entityService.findMany('api::noticia.noticia', {
      ...query,
      populate,
    });
    const total = await strapi.entityService.count('api::noticia.noticia', { filters: query.filters });
    return {
      data: results,
      meta: {
        pagination: {
          page: query.pagination?.page || 1,
          pageSize: query.pagination?.pageSize || 25,
          pageCount: Math.ceil(total / (query.pagination?.pageSize || 25)),
          total,
        },
      },
    };
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const result = await strapi.entityService.findOne('api::noticia.noticia', id, {
      populate: { categoria: true },
    });
    return { data: result };
  },
}));
