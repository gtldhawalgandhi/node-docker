#syntax=docker/dockerfile:1.2
FROM node:14.17-alpine3.13 as base
ENV PATH=/work/node_modules/.bin:$PATH
ENV NODE_ENV=production
RUN mkdir /work && chown -R node:node /work
WORKDIR /work
COPY --chown=node:node package.json yarn.lock* ./

FROM base as base_deps
RUN --mount=type=cache,target=/work/node_modules yarn

FROM base_deps as dev
ENV PATH=/work/node_modules/.bin:$PATH
ENV NODE_ENV=development
COPY --chown=node:node packages/backend/package.json ./packages/backend/package.json
COPY --chown=node:node packages/realtime/package.json ./packages/realtime/package.json
COPY --chown=node:node packages/graph/package.json ./packages/graph/package.json
COPY --chown=node:node packages/lib/package.json ./packages/lib/package.json
RUN --mount=type=cache,target=/work/node_modules yarn

FROM base_deps as source
COPY --chown=node:node . .

FROM dev as dev_source
COPY --chown=node:node . .
RUN  --mount=type=cache,target=/work/node_modules yarn run build

#####################################################################

FROM dev_source as lint_test
RUN --mount=type=cache,target=/work/node_modules eslint .
RUN --mount=type=cache,target=/work/node_modules jest
CMD ["eslint ."]

FROM lint_test as realtime
CMD ["yarn", "workspace", "@app/realtime", "run", "dev:run"]

FROM lint_test as graph
CMD ["yarn", "workspace", "@app/graph", "run", "dev:run"]

FROM lint_test as backend
CMD ["yarn", "workspace", "@app/backend", "run", "dev:run"]

#####################################################################

FROM base as prod_realtime

COPY --from=dev_source /work/packages/realtime/build /work/
COPY --from=dev_source /work/package.json /work/package.json
USER node
CMD ["node", "server.js"]

FROM base as prod_graph

COPY --from=dev_source /work/packages/graph/build /work/
COPY --from=dev_source /work/packages/graph/src/ql/schema.graphql /work/schema.graphql
COPY --from=dev_source /work/package.json /work/package.json
USER node
CMD ["node", "server.js"]

FROM base as prod_backend

COPY --from=dev_source /work/packages/backend/build /work/
COPY --from=dev_source /work/package.json /work/package.json
USER node
CMD ["node", "server.js"]

#####################################################################