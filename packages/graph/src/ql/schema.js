import fs from 'fs';
import path from 'path';
import { buildSchema } from 'graphql';

const schema = fs.readFileSync(path.resolve(__dirname, 'schema.graphql'), { encoding: 'utf8' });

export default buildSchema(schema);
