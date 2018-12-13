FROM node:8-alpine

WORKDIR /data

COPY package.json /data
RUN yarn

COPY . /data

EXPOSE 3333
CMD ["yarn", "start"]
