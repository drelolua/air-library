var Koa = require("koa");
var app = new Koa();
var bodyParser = require("koa-bodyparser");
app.use(bodyParser());


app.use(async (ctx,next)=>{
    console.log(`New request: ${ctx.request.method} ${ctx.request.url} ...`);
    await next();
});

app.use(async(ctx,next)=>{
    if(ctx.url === '/'){
        ctx.body="Index page";
    }else{
        await next();
    };
});

app.use(async(ctx,next)=>{
    var url = ctx.url;
    var modulename=url.split('/')[1];
    try{
        var mod=require('./controllers/'+modulename);
        app.use(mod.routes());
        await next();
    }catch(e){
        var err = "module: "+modulename+" is not found, please check it.";
        ctx.body=err;
        await next();
    }
});

app.listen(3000)
