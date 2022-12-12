import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { poolRoutes } from "./routes/pool";
import { authRoutes } from "./routes/auth";
import { gameRoutes } from "./routes/game";
import { guessRoutes } from "./routes/guess";
import { userRoutes } from "./routes/user";

// contar quantos bolões tem:
async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  //em produção isso precisa ser uma variável ambiente
  await fastify.register(jwt, {
    secret: "nlwcopa",
  });

  await fastify.register(poolRoutes);
  await fastify.register(authRoutes);
  await fastify.register(gameRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(userRoutes);

  // para mostrar os bolões que começam com n:
  // fastify.get("/pools/count", async () => {
  //   const pools = await prisma.pool.findMany({
  //     where: {
  //       code: {
  //         startsWith: "n",
  //       },
  //     },
  //   });

  //   return { pools };
  // });

  await fastify.listen({ port: 3333, host: "0.0.0.0" });
}

bootstrap();
