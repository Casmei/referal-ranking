import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { env } from '../../env';
import { accessInviteLink } from '../functions/access-invite-link';
import { getRanking } from '../functions/get-ranking';
export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/ranking',
    {
      schema: {
        summary: 'Get ranking',
        tags: ['Referral'],
        response: {
          200: z.object({
            ranking: z.array(
              z.object({ id: z.string(), name: z.string(), score: z.number() })
            )
          }),
        },
      },
    },
    async (request, reply) => {
      const { rankingWithScore } = await getRanking();

      return reply.send({ ranking: rankingWithScore });
    }
  );
};
