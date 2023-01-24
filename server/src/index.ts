// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import express, { Application } from 'express';
import { ApolloServer} from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql'
import { connectDatabase } from './database';

const mount = async (app:Application) => {
    const db = await connectDatabase();
    const server = new ApolloServer({ typeDefs, resolvers, context: () => ({ db }) });
    server.start().then(() => {
        server.applyMiddleware({
          app,
          path: '/api',
          cors: true,
        });

      });

        // tell epxress to create node server at specified port
        app.listen(process.env.PORT);

        console.log(`[app]: http://localhost:${process.env.PORT}`);

}

mount(express());
