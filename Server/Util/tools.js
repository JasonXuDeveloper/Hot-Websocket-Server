const chokidar = require('chokidar');
const decache = require("decache");
const log4js = require('log4js');
const fs = require('fs');
require('path');

log4js.configure({
    appenders: {
        out:{ type: 'console' },
        app:{
            type: 'dateFile',
            filename: `Log/${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}.log`,
            pattern: 'yyyy-MM-dd-hh',
            alwaysIncludePattern: false,
        }
    },
    categories: {
        default: { appenders: [ 'out', 'app' ], level: 'debug' }
    }
});

module.exports =
    {
        /**
         * 主程序logger
         * @return {Object}
         */
        appLogger(){
            return log4js.getLogger("服务端主程序");
        },
        /**
         * 文件监听logger
         * @return {Object}
         */
        fileLogger(){
            return log4js.getLogger("文件监听");
        },
        /**
         * 数据库logger
         * @return {Object}
         */
        dbLogger(){
            return log4js.getLogger("数据库");
        },
        /**
         * 北京时间
         * @return {Date} 北京时间
         */
        getTime() {
            return new Date(new Date().getTime() + (parseInt(new Date().getTimezoneOffset() / 60) + 8) * 3600 * 1000);
        },
        /**
         * 获得时间
         * @return {number} 现在的时间戳
         */
        now(){
            return Date.parse(this.getTime())/1000;
        },
        /**
         * 获取目录下全部js文件
         * @param {string} path 路径，'./'是根目录
         * @param {Array.<string>} exclude 排除文件，需要后只会
         * @return {Array.<string>} 没有后缀名的文件名数组
         */
        getFiles(path, exclude=[]){
            let files = fs.readdirSync(path, (err, files) =>
                files.filter((e) => path.extname(e).toLowerCase() === '.js'))
                .filter((e)=>{
                   return exclude.indexOf(e) === -1;
                });
            return files.map(function(i){return i.replace(".js","")});
        },
        /**
         * 唯一ID
         * @param {number} length 长度
         * @return {string}
         */
        uuid(length=10) {
            return ('x'.repeat(length)).replace(/[xy]/g, function(c) {
                let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        /**
         * 监听文件夹下文件变化并且热更
         * @param {string} filePath 目录或文件
         * @param {string} reqPath require的路径
         * @param {function(Object)} callback 回调
         */
        hotUpdate(filePath,reqPath,callback=null){
            this.fileLogger().debug(`正在监听 ${filePath}，发生修改后会热更`);
            chokidar.watch(filePath, {
                persistent: true,
                followSymlinks: true,
                cwd: '.',
                disableGlobbing: false,
                usePolling: true,
                interval: 100,
                binaryInterval: 200,
                alwaysStat: false,
                depth: 99,
                awaitWriteFinish: {
                    stabilityThreshold: 900,
                    pollInterval: 100
                },
                ignorePermissionErrors: false,
                atomic: true // or a custom 'atomicity delay', in milliseconds (default 100)
            }).on('all', (event, path) => {
                if(event !== "add" && event !== "change" && event !== "unlink"){
                    return;
                }
                this.fileLogger().info(`${path}发生更新: ${event}`)
                let r = reqPath.replace("./","../");
                decache(r);
                if(callback){
                    callback(require(r));
                }
            });
        },
        /**
         * 获取错误对象
         * @param {string} msg 错误消息
         * @param {number} code 错误号
         */
        errMsg(msg,code=500){
            return {
                code: code,
                msg: msg
            }
        },
        /**
         * 获取成功对象
         * @param {string} msg 成功消息
         * @param {Object} data 数据
         * @param {number} code 成功号
         */
        sucMsg(msg,data,code=200){
            return {
                code: code,
                msg: msg,
                data: data
            }
        },
    }