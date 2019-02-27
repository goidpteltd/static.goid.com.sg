import Koa from "koa";
import Router from "koa-router";
import serve from "koa-static";
import nconf from "./helpers/nconf";
import { resolve } from "path";

import ampCORS from "./helpers/amp-cors";
import crawlerHandler from "./helpers/crawler-handler";

const app = new Koa();
const router = new Router();

const PORT = +nconf.get("webserver:port");

router.use("*", ampCORS.allowedMethods(), ampCORS.routes());
router.use("*", crawlerHandler.allowedMethods(), crawlerHandler.routes());

router.get("*", serve(resolve(__dirname, "../public/")));

app.use(router.allowedMethods());
app.use(router.routes());

app.listen(PORT);
