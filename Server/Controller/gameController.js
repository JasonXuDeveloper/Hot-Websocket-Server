module.exports.methods =
    {
        async heartbeat(db,tools,models,data,callback){
            callback(tools.sucMsg("heartbeat",{}));
            /*
            TODO db
            let id = data['id'];
            let pd = await db.player_collection.findOne({"id":id});
            if(!pd){//账号不存在就通知非法
                callback(tools.errMsg("非法请求"));
            }
            else{//存在就更新在线状态和心跳时间
                //让ide能给出提示
                if(!models.player){
                    models.player = require('../Model/player');
                }
                let p = models.player.fromObj(pd);
                p.online = true;
                p.heartbeatTime = tools.now();
                await db.update(db.player_collection,{"id":p.id},p);
                TODO timer
                //测试客户端心跳包3秒1个，所以搞一个2900ms后的定时器，把玩家变离线
                setTimeout(async()=>{
                    p.online = false;
                    await db.update(db.player_collection,{"id":p.id},p);
                },2900);
                callback({
                    code:200
                });
            }
             */
        }
    }