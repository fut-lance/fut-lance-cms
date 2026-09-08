import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::noticia.noticia', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    if (!query.populate) {
      query.populate = { categoria: true };
    }
    const sanitizedQuery = await this.sanitizeQuery(ctx);
    const results = await strapi.entityService.findMany('api::noticia.noticia', sanitizedQuery);
    const sanitizedResults = await this.sanitizeOutput(results, ctx);
    return this.transformResponse(sanitizedResults, {}, sanitizedQuery);
  },

  async findOne(ctx) {
    const { query } = ctx;
    if (!query.populate) {
      query.populate = { categoria: true };
    }
    const sanitizedQuery = await this.sanitizeQuery(ctx);
    const { id } = ctx.params;
    const result = await strapi.entityService.findOne('api::noticia.noticia', id, sanitizedQuery);
    const sanitizedResult = await this.sanitizeOutput(result, ctx);
    return this.transformResponse(sanitizedResult, {}, sanitizedQuery);
  },
}));
