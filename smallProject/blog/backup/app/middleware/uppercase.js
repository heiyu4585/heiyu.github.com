// app/middleware/uppercase.js
module.exports = () => {
    return async function uppercase(ctx, next) {
        console.log("zheli这里执行了!!!");
        console.log()
        ctx.query.name = ctx.query.name && ctx.query.name.toUpperCase();
        await next();
    };
};