import Router from "koa-router";

const router = new Router();

router.all("*", async (ctx, next) => {
  await next();

  ctx.set({
    "X-Robots-Tag": "none"
  });
});

export = router;
