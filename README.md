### Install Task on your host machine >> https://github.com/go-task/task/releases/

### Create .env file from example.root.env file

### Command

    task rebuild-all
    
    ### Or if you also want to re-build any image defined in compose file
    task compose-up -- --build

# Day5

- Add nodemonConfig in package.json

- Add .eslintignore

- Install deps before running compose commands

- Configure jest
    
    task install-deps -- add -D jest babel-jest

    task exec -- jest --init  (Run this only when no jest.config.js file is there)

    ## Add babel-jest as jest transformer

          transform: {
            '^.+\\.js$': 'babel-jest'
          }

- task clean-rebuild
    ### Ensure that your root workspace folder is named 'node'
    ### This removes mongo volumes, containers and volumes, but not any images

- Run tests from your host machine using `task test`