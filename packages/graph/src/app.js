
import Express from 'express';
import { cors } from '@app/lib/middlewares/cors';
import { graphqlHTTP } from 'express-graphql';
import { graphQLSchema, graphQLResolvers } from './ql';

import Logger from '@app/lib/logger';
const logger = new Logger('App-Entry', 'app.js');

const app = new Express();
app.use(Express.json());
app.use(cors);
app.use(Express.urlencoded({ extended: true }));

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true,
    customFormatErrorFn: (err) => {
      logger.error(`customFormatErrorFn: ${JSON.stringify(err, null, 2)}`);

      let ret = {
        message: err.message,
        locations: err.locations,
        path: err.path
      };

      if (process.env.NODE_ENV !== 'production') {

        ret = { ...ret, stack: err?.stack ? err.stack?.split('\n') : [] };
      }

      return ret;
    }
  })
);

app.use((err, req, res, next) => {
  if (err instanceof Error) {
    res.status(500).json({ err: 'Something went wrong' });

  }
  else {
    next();
  }
});

export default app;
