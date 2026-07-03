import { env } from "./config/env.js";
import { app } from "./app.js";

app.listen(env.API_PORT, () => {
  console.log(`ReadyCap API listening on port ${env.API_PORT}`);
});
