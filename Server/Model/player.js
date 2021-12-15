let tools = require('../Util/tools');

module.exports = class player {
    id;
    name;
    password;
    online;
    loginTime;
    heartbeatTime;

    constructor(id, name, password, online, loginTime, heartbeatTime) {
        this.id = id ?? tools.uuid();
        this.name = name;
        this.password = password;
        this.online = online ?? false;
        this.loginTime = loginTime ?? 0;
        this.heartbeatTime = heartbeatTime ?? 0;
    }

    objToClient() {
        return {
            id: this.id,
            name: this.name,
            loginTime: this.loginTime
        };
    }

    static fromObj(obj) {
        return new player(obj.id, obj.name, obj.password, obj.online, obj.loginTime, obj.heartbeatTime)
    }
}