let tools = require("../Util/tools");
model = module.exports;
let files = tools.getFiles("./Model/",['models.js']);
files.forEach(f=>{
   model[f] = require(`./${f}`);
});