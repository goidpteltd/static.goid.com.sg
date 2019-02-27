import cfenv from "cfenv";
import nconf from "nconf";
import { resolve } from "path";

const cfenvStr = cfenv.getAppEnv();

nconf
  .defaults(cfenvStr)
  .file(resolve(__dirname, "../../.env"))
  .env();

export = nconf;
