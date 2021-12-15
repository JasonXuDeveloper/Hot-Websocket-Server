let tools = require("../Util/tools");
controllers = module.exports;
controllers.methods = {};
controllers.cache = {};
controllers.updated = true;
let files = tools.getFiles("./Controller/",['controller.js']);
files.forEach(f=>{
    let ms = require(`./${f}`).methods;
    for(let m in ms){
        controllers.methods[m] = ms[m];
    }
});