import cfenv from "cfenv";
import nconf from "nconf";
import { resolve } from "path";

const cfenvData = cfenv.getAppEnv();

nconf
  .file(resolve(__dirname, "../../.env"))
  .env();

nconf.set('webserver:port', cfenvData.port);

export = nconf;
