let server = require('socket.io');//socket
let tools = require('./Util/tools');
let models = require('./Model/models');
let controllers = require('./Controller/controllers');

let io = new server(8001);
tools.appLogger().debug('服务器已开始运行');

setTimeout(async()=>{
    //热更新模型，逻辑等
    tools.hotUpdate('./Controller/','./Controller/controllers',c=>{
        controllers.cache = controllers.methods;
        controllers.methods = c.methods;
        controllers.updated = true;
        for (let i in controllers.methods){
            tools.appLogger().info(`方法${i}已热更`);
        }
    });
    tools.hotUpdate('./Model/','./Model/models',m=>{
        models = m;
    });
    tools.hotUpdate('./Util/tools.js','./Util/tools',t=>{
        tools = t;
    });
},500);

//开始运行服务器
io.on('connection', async function(socket) {
    setInterval(refresh,1000);

    function refresh(){
        if(controllers.updated){
            for(let m in controllers.cache){
                if(m){
                    socket.removeAllListeners(m);
                }
            }
            controllers.updated=false;
            for(let m in controllers.methods){
                tools.appLogger().debug(m);
                socket.on(m,async (data,callback)=>{
                    refresh();
                    try{
                        controllers.methods[m](db,tools,models,data,callback);
                    }
                    catch (ex){
                        tools.appLogger().error(`方法${m}出现`+"错误: "+ex);
                        callback(tools.errMsg("系统错误"));
                    }
                });
            }
        }
    }
});