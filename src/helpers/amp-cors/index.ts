import Router from "koa-router";
import nconf from "nconf";
nconf.env();

const router = new Router();

const allowedSourceOrigin: string =
  nconf.get("allowedSourceOrigin") || "https://www.goid.com.sg";
const allowedOrigins: string[] = [
  "https://www.goid.com.sg",
  "https://example-com.cdn.ampproject.org",
  "https://example.com.amp.cloudflare.com",
  "https://cdn.ampproject.org",
  allowedSourceOrigin
];
var origin: string;

router.all("/", async (ctx, next) => {
  await next();
  var sourceOrigin = ctx.query.__amp_source_origin;
  var ampFlag = false;

  if (ctx.header["amp-same-origin"] === "true") {
    origin = sourceOrigin;
    ampFlag = true;
  } else if (allowedOrigins.includes(ctx.headers.origin)) {
    sourceOrigin = allowedSourceOrigin;
    origin = ctx.headers.origin;
    ampFlag = true;
  }

  if (ampFlag) {
    ctx.set({
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Expose-Headers": "AMP-Access-Control-Allow-Source-Origin",
      "AMP-Access-Control-Allow-Source-Origin": sourceOrigin
    });
  }
});

export default router;
