# Day2

- Where is yarn coming from used within our Dockerfile?

    https://github.com/nodejs/docker-node/blob/main/12/alpine3.12/Dockerfile

- Export lock files by running shell commands via docker on a bind mounted volume

      yarn export-lockfiles

- Change docker behavior via ENV vars .. NodeJS to accept PORT via ENV var
- ENV in dockerfile

      ENV PORT 9999

      EXPOSE $PORT

      docker run --env PORT=7777 ......

- Run Dev environment with nodemon inspector to debug our Node app

      nodemon --inspect=0.0.0.0 index.js

    * Update launch.json file to tell VSCode how to debug our NodeJS app

    * Expose debug port 9229

- Convert Docker commands into Docker Compose

    * Ctrl Shift p -> Add Docker Compose files to Workspace

    * NODE_ENV=development

    * Expose nodemon debug port

- Building images using docker compose

    
    ### Using Docker VSCode extension
    * Right Click on docker-compose.dev.yml file and "Compose Up"

    ### Or using CLI
      docker-compose -f docker-compose.dev.yml up --build

- Convert our CommonJS NodeJS app to use ES Next syntax using babel

      yarn dev:sh 'yarn add @babel/node @babel/core @babel/cli @babel/preset-env'

    * Add .babelrc config to our root workspace

    * Tell nodemon to use babel-node instead of node

      
          nodemon --inspect=0.0.0.0 --exec babel-node index.js
    
- Ensure we export all lock files back into the host machine for version control purpose