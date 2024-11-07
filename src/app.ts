import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";

import createApp from "@/lib/create-app";

import { pinoLogger } from "./middlewares/pino-logger";

const app = createApp();

app.use(serveEmojiFavicon("📝"));

app.use(pinoLogger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.notFound(notFound);
app.onError(onError);

export type AppType = typeof app;

export default app;
