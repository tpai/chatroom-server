# Chatroom Server

This server contains image upload API and real-time socket.

## Usage

Start both chatroom web and API server in development mode.

```
docker-compose up api-dev
```

Now `api-dev` is using `nodemon` to watch code changes, and `app` is serving frontend part at port 8080.
