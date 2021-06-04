FROM node:12.4.0-alpine 

# NODE_ENV=production will not install devDependencies
ENV NODE_ENV=development

WORKDIR /work

# First copy over package.json and other lock files if any to ensure that we dont run dependencies for every change made within out business logic files
COPY package.json package-lock.json* yarn.lock* npm-shrinkwrap.json* ./

RUN yarn

# For debug purpose
RUN sh -c "cat package.json"

RUN sh -c "ls -lA node_modules"

COPY . .

# This does not actually expose anything, its only meant for reference purpose
EXPOSE 9999

# WHen you start container this command will get executed
# You can override this during runtime if you want
CMD ["yarn", "devrun"]