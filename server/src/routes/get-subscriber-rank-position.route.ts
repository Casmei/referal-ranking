import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { getSubscriberRankingPosition } from '../functions/get-subscriber-invites-position';

export const getSubscriberRankPositonRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/position',
      {
        schema: {
          summary: 'Get subscriber ranking position',
          tags: ['Referral'],
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              position: z.number().nullable(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { subscriberId } = request.params;

        const { position } = await getSubscriberRankingPosition({
          subscriberId,
        });

        return reply.send({ position });
      }
    );
  };
