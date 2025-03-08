import { fastifyCors } from '@fastify/cors';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { fastify } from 'fastify';
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { env } from '../env';
import { accessInviteLinkRoute } from './routes/access-invite-link.route';
import { getSubscriberInviteClicksRoute } from './routes/get-subscriber-invite-clicks.route';
import { getSubscriberInvitesCountRoute } from './routes/get-subscriber-invites-count.route';
import { getSubscriberRankPositonRoute } from './routes/get-subscriber-rank-position.route';
import { subscribeToEventRoute } from './routes/subscribe-to-event.route';

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, { origin: true });
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'teste',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

//Rotas
app.register(subscribeToEventRoute);
app.register(accessInviteLinkRoute);
app.register(getSubscriberInviteClicksRoute);
app.register(getSubscriberInvitesCountRoute);
app.register(getSubscriberRankPositonRoute);

app.listen({ port: env.PORT }).then(() => {
  console.log('Servidor rodando!');
});
