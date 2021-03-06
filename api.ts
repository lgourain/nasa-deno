import { Router } from "./deps.ts";
import * as planets from "./models/planets.ts";
import * as launches from "./models/launches.ts";

const router = new Router();

router.get("/", (ctx) => {
    ctx.response.body = "Mission Control API";
});

router.get("/planets", (ctx) => {
    ctx.response.body = planets.getAllPlanets();
});

router.get("/launches", (ctx) => {
    ctx.response.body = launches.getAll();
});

router.get("/launches/:id", (ctx) => {
    if (ctx.params?.id) {
        const launch = launches.getOne(Number(ctx.params.id));
        if (launch) {
            ctx.response.body = launch;
        } else {
            ctx.throw(400, "Launch with that ID doesn't exist");
        }
    }
});

router.post("/launches", async (ctx) => {
    const body = await ctx.request.body();
    const content = await body.value;

    launches.addOne(content);

    ctx.response.body = { success: true };
    ctx.response.status = 201;
});

router.delete("/launches/:id", (ctx) => {
    if (ctx.params?.id) {
        const result = launches.removeOne(Number(ctx.params.id));
        ctx.response.body = { success: result };
    }
});

export default router;