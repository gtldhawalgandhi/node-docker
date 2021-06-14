### Install Task on your host machine >> https://github.com/go-task/task/releases/

### Create .env file from example.root.env file

### Command

    task rebuild-all
    
    ### Or if you also want to re-build any image defined in compose file
    task compose-up -- --build

# Day4

- Version is no longer required to be defined at the top level compose yaml file
  ### https://github.com/compose-spec/compose-spec/blob/master/spec.md

- Add new Post schema

- Re-organize our directory to include 'services' section

    * Job of services is to isolate logic that makes calls to the DB instead of putting eveything inside controllers

- Re-organize our controllers, routes and entry point file

- Integrate ESLint (Code quality tool)

  * Install ESLint VSCode extension

  * add this into .vscode/settings.json

         "eslint.workingDirectories": [
           "backend"
         ]

  * For this to work there are atleast 2 appraches

      1. Install eslint globally and keep our Docker volume mounts as is and no change shall be made to node_modules

      2. Install locally but map our host machine node_modules to container**

          With this approach, host machine must ensure that all dependencies are handled and only then nounted to the containers to have it all work properly

  * Install required node libraries


  * Change bring node_modules at root workspace and volume settings in compose file as well

  * For a single node_modules at root workspace use yarn workspaces

  * 2 compose files, one with internal node_modules and another with mounted node_modules

- Integrate Tasks for better workflow (https://taskfile.dev/)

    * Use .env to provide environment to compose

- Aliases

    * jsconfig.json at the root workspace

    * Integrate aliases with Babel (package.json)

      {
        "babel-plugin-module-resolver": "^4.1.0"
      }