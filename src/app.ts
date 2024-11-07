import { OpenAPIHono } from "@hono/zod-openapi";
// import { logger } from "hono/logger";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";

import { pinoLogger } from "./middlewares/pino-logger";

const app = new OpenAPIHono();

app.use(serveEmojiFavicon("📝"));

// app.use(logger())
app.use(pinoLogger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/test", (c) => {
  return c.text("Hello Hono!");
});

app.notFound(notFound);
app.onError(onError);

export type AppType = typeof app;

export default app;
