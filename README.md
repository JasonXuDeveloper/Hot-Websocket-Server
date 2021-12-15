# Hot-Websocket-Server v1.0
一个可以热更通讯事件/数据模型/定时器的node服务端架构，采用websocket通信 

A node server allows hot update logics/ data model / timer in runtime, using websocket protocol



### 已支持的功能

- 运行时热更消息事件
- 运行时热更数据模型
- websocket通信
- 日志



### Supported Features

- Hot update message event logics in runtime
- Hot update data model in runtime
- Websocket protocol
- Logs



### 后续支持功能

- MongoDB组件
- 定时器
- 完善小Demo



### Features under designing

- MongoDB component
- Timer component
- A complete tiny demo



### 如何使用

1. Clone本项目

2. ```shell
   cd Server
   npm install
   node app.js
   ```

3. 在```Controller```目录下新建文件，参考```gameController```和```loginController```的写法即可
4. 在```Model```目录下新建文件，参考```player```的写法即可
5. 用socket.io客户端连接```ws://{ip}:{port}/socket.io/?EIO=3&transport=websocket```，默认在8001端口

### How to use

1. Clone the repo

2. ```shell
   cd Server
   npm install
   node app.js
   ```

3. Create new files under ```Controller``` directory, reference ```gameController``` and ```loginController``` while writing new controllers
4. Create new files under ```Model``` directory, reference ```player``` while writing new controllers
5. Use socket.io client connect ```ws://{ip}:{port}/socket.io/?EIO=3&transport=websocket```, default on port 8001



### 依赖/Dependencies

- socketio@2.4.1
- log4js@6.3.0
- chokidar@3.5.2
- decache@4.6.1
