var Router = require("koa-router");

var forums = new Router();
var posts = new Router();


var boxs = {
    '1':{
        id:1,
        contain:11,
        status:0
    },
    '2':{
        id:2,
        contains:20,
        status:1
    }
};


posts.post("/",async (ctx,next) =>{
    ctx.body="cabinet.post";
});
posts.get("/",async (ctx,next)=>{
    ctx.body="cabinet.get";
});

posts.get("/box",async(ctx,next)=>{
    var body=ctx.request.query;
    var boxid=body.id |1;
    var box=boxs[boxid]
    ctx.body=box?box:"Box not found.id: "+boxid;
    //ctx.body="this is a box of a cabinet.";
});

posts.post("/box",async(ctx,next)=>{
    var body=ctx.request.body;
    boxs[body.id]=body;
    ctx.body={status:"ok",resources:boxs[body.id]};
})


forums.use("/cabinet",posts.routes(),posts.allowedMethods());

module.exports=forums;
