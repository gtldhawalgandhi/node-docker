
# Day6 (Yarn workspaces / monorepo)

### Command

    task rebuild-node-app

    task test-realtime

- Old folder structure

        |-.env
        |-docker-compose.dev.yml
        |-backend
            |-package.json
            |-Dockerfile.dev
            |-babel.config.js
            |-package.json
            |-lib

- New folder structure

        |-.env
        |-package.json
        |-docker-compose.dev.yml
        |-Dockerfile.dev
        |-babel.config.js
        |-packages
          |-backend
            |-package.json
          |-lib


- Changes at root level

    - New package.json

            {
            "private": true,
                "workspaces": {
                    "packages": [
                    "packages/*"
                    ]
                }
            }

        Run yarn to activate workspaces

    - Pull babel.config and jest.config, Dockerfile, ignore files here from 'backend' directory

    - Update .vscode settings and Taskfile

- Workspaces changes

    - Extract common functionality into a new 'lib' package

    - Update babel.config.js files for proper module resolution

            @app/backend
            
            @app/lib

    - Problem is babel fails to load packages outside its context and so we cannot import a workspace package which has ESModule syntax. In order to fix this issue we need to build our lib package into a separate 'build' directory and use that instead 

        #### **Update lib/package.json to have this entry at the top level**

          "files": [
            "build/"
           ]
    
    - After creating new workspace make sure to run `yarn` command for the system to recognize the new package.

- Websockets using socket.io (new workspace package `@app/realtime`)

    - This package handles sending websocket events to the connected clients

    - Put them in separate workspace so that we could deploy it separately with a different endpoint

    - contains POST endpoint for pushing our websocket messages to connected clients

    - create out node client to listen to websocket messages for testing purpose

        #### **From the root workspace run this command**

            yarn workspace @app/realtime run client

        #### From Postman send a POST request to `http://localhost:9998/realtime` endpoint