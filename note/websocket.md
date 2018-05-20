#websciket
## 服务端与服务端通信

https://www.npmjs.com/package/socket.io-client

### Socket.io 的发送对象范围
```

向当前客户端发送事件
socket.emit('login', {
      numUsers: numUsers
    });
广播（不包含当前客户端）
socket.broadcast.emit('new message', {
  username: socket.username,
  message: data
});
广播（且包含当前客户端）
io.sockets.emit('message', "this is a test");
在房间广播（不包含当前客户端）
socket.broadcast.to('game').emit('message', 'nice game');
在房间广播（包含当前客户端）
io.sockets.in('game').emit('message', 'cool game');
发送给指定客户端
io.sockets.socket(socketid).emit('message', 'for your eyes only');
```