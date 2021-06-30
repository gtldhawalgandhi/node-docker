
# Day9

- Create dev.env and prod.env files (See .env.prod.example)

    ### common:build-stack command only builds our production image 

        task -t Taskfile.build.yml STAGE=build common:build-stack

- Push images to Docker (Write a task file to do this as well) - [Do not add any tags]

        docker login

        docker push yourDockerId/prod-backend-image
        docker push yourDockerId/prod-graph-image
        docker push yourDockerId/prod-realtime-image

- Start compose using our new prod image

    ### common:compose-up consumes and starts our production image 

        task -t Taskfile.prod.yml STAGE=prod common:compose-up

- Microsoft Azure

    * Create VM with mostly default config

    * VM creation requires

        1. Resource Group
        2. Virtual Net (VNET)
                
                2^(32-16) [65536] ip addresses available
            
            Ex: 10.0.0.0/16
            Ex: 10.1.0.0/16
            Ex: 172.17.0.0/16

        3. Subnet (10.0.0.0/24)

                2^(32-24) [256] ip addresses available

        4. Add existing RSA public key for SSH access**
        5. Create Public IP
        6. Storage Disks
        7. Add cloud-init that:
        
            * adds 'docker' group
            * adds a new user
            * adds that user to docker group
            * installs required packages
            * installs docker and docker-compose
            * Reboots machine once cloud-init completes to take docker group memebership into effect

    * Copy over all env, prod docker-compose and task files

    * Run compose up to start our app 

    * Open up relevant ports from Network Security Group (NSG) so we can access our app from the internet


** https://docs.microsoft.com/en-us/troubleshoot/azure/virtual-machines/ed25519-ssh-keys

