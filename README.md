# Day1

- Run basic NodeJS code on docker
- VSCode extensions
  - Remote Development
  - Docker
  - Thunder client (Like Postman)
  
- Basic setup inside empty workspace
  - npm init -y
  - npm install -g yarn
  - yarn add express
  - yarn add -D nodemon
  - Write basic NodeJS service using express
  - Run code on host machine
  - Run code on docker
      
        # Does not do anything since we have not provided an entry point js file
        docker run node:12.4.0-alpine

        # Does not do anything either since there is no node_modules inside container
        docker run node:12.4.0-alpine index.js
        
        # Mount our host machine onto the container and this works, but host machine cannot access port 9999
        docker run -v ${PWD}:/work -w /work node:12.4.0-alpine /bin/sh -c "yarn && node index.js"
        
        # For Windows machine (Does this work?)
        docker run -v %cd%:/work -w /work node:12.4.0-alpine /bin/sh -c "yarn && node index.js"

        # 
        docker run -v ${PWD}:/work -w /work  -p 10000:9999   node:12.4.0-alpine /bin/sh -c "yarn && node index.js"
  
- Build custom Docker image
  - Create Dockerfile
    - Ctr Shift P -> Add Docker Files to workspace
  - Build command  
    - Right click -> Build Image
    - docker build -t nodeappimage:v1 .



