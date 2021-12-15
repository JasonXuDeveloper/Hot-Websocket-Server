module.exports.methods =
    {
        async req_player(db,tools,models,data,callback){
            let usr = data['usr'];
            let pwd = data['pwd'];
            let login = data['login'];// if false then register
            //TODO fetch data from db and verify
            //让ide能给出提示
            if(!models.player){
                models.player = require('../Model/player');
            }
            let player = new models.player(null,usr,pwd,true,tools.now(),0);
            callback(tools.sucMsg("登陆成功",player.objToClient()));
            /*
            OR:
            callback(tools.errMsg("登陆失败"));
             */
        }
    }