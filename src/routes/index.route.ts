import { createRoute, z } from "@hono/zod-openapi";
import * as HTTPStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import { createRouter } from "@/lib/create-app";

const router = createRouter()
  .openapi(createRoute({
    tags: ["Index"],
    method: "get",
    path: "/",
    responses: {
      [HTTPStatusCodes.OK]: jsonContent(z.object({
        message: z.string(),
      }), "Tasks API Index"),
    },
  }), (c) => {
    return c.json({ message: "Tasks API" });
  });

export default router;
