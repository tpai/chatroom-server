# Chatroom Server

This server contains image upload API and real-time socket.

## Usage

Create mysql docker container

```
docker run --name mysql \
  -v $(pwd)/mysql:/var/lib/mysql \
  -e MYSQL_DATABASE=db \
  -e MYSQL_USER=user \
  -e MYSQL_PASSWORD=pass \
  -e MYSQL_ROOT_PASSWORD=admin \
  -p 3306:3306 \
  -d mysql:5
```

Install dependencies

```
yarn
```

Sync database with ORM and launch server at port 3000

```
yarn start
```
