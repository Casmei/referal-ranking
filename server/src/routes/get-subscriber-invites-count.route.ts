import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { getSubscriberInvitesCount } from '../functions/get-subscriber-invites-count';

export const getSubscriberInvitesCountRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/counts',
      {
        schema: {
          summary: 'Get subscriber ranking invite clicks count',
          tags: ['Referral'],
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { subscriberId } = request.params;

        const { count } = await getSubscriberInvitesCount({ subscriberId });

        return reply.send({ count });
      }
    );
  };
