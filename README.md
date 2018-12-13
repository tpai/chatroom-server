# Chatroom Server

This server contains image upload API and real-time socket.

## Usage

Use docker compose to launch the service

```
docker-compose up
```

### Development

Create mysql instance

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

Start developing at `*:3333`

```
yarn start
```
