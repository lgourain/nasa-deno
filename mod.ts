import { Application } from "https://deno.land/x/oak@v5.0.0/mod.ts";

const app = new Application();
const PORT = 8000;

app.use(async (ctx, next) => {
    await next();
    console.log(`${ctx.request.method} ${ctx.request.url}`)
});

app.use((ctx) => {
    ctx.response.body = "Mission Control API";
});

if (import.meta.main) {
    await app.listen({
        port: PORT
    });
}