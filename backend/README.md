# Day3

- Move everything, except compose file, inside new 'backend' directory

- Ensure our VSCode debugger config is updated accordingly

- Convert our NodeJS app into a 'Model, Route, Controller' design pattern

- Introduce centralized logging & config for our app

    * Purpose of having centralized logging

    * Define log levels in our logging to ensure we control the amount of logs we keep around between production and development environments.

- Update our compose file to have

    * New Mongo db service config to run Mongo DB container
      
      * Use init script to create user that will get used by node app to access db

      * Ensure our container is mounted on a persistent volume so a future restart will keep old data around

      * Expose Mongo ports so that host machine can also have access

    * new Mongo UI service for accessing our Mongo DB

    * Updated Node app service with new DB env and volumes pointing to 'backend' 

    * Ensure we have setup correct dependencies within our docker compose using 'depends_on'