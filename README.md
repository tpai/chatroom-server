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

Create table

```sql
use db;
create table messages(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userId integer,
  username text,
  text text,
  type enum('text', 'image') NOT NULL DEFAULT 'text',
  channelId integer
);
```

Install dependencies and launch server

```
yarn && yarn start
```
