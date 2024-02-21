import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import fastifyPluginView from "@fastify/view";
import fastifyPluginTypeOrm from "fastify-typeorm-plugin";
import ejs from "ejs";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const fastify = Fastify({
    logger: true
});

fastify.register(fastifyPluginView, {
    engine: {
      ejs: ejs
    },
    root: './views',
    viewExt: 'ejs'
});

/* Database sections */
// Import TypeORM and the User entity
import { User } from './entity/User'
import { Equal, createConnection, createConnections } from "typeorm";

console.log(process.env.postgre_password)

// TypeORM
fastify.register(require('fastify-typeorm-plugin'), {
  connection: createConnection({
    type: 'postgres',
    host: '0.0.0.0',
    port: 5432,
    username: process.env.postgre_username,
    password: process.env.postgre_password,
    database: 'fastify',
    entities: [User],
    synchronize: true
  })
})

fastify.get("/:uid", async (req, reply) => {
    const { uid } = req.params as { uid: string };
    console.log(uid)

    // Find only one user
    const userRepo = fastify.orm.getRepository(User);
    const thisUser = await userRepo.findOne({
        where: {
            id: Equal(uid)
        }
    })
    
    // Send view to user
    reply.view("main", {
        userName: thisUser?.name
    })
});

(async () => {
    try {
        await fastify.listen({ port: 8080, host: '0.0.0.0' });
    }
    catch(err) {
        fastify.log.error(err)
        process.exit(1);
    }
})()
