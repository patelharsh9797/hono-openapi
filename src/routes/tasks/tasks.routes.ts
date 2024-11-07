import { createRoute, z } from "@hono/zod-openapi";
import * as HTTPStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

import { insertTasksSchema, selectTasksSchema } from "@/db/schema";

export const list = createRoute({
  tags: ["Tasks"],
  path: "/tasks",
  method: "get",
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(z.array(selectTasksSchema), "The list of tasks"),
  },
});

export const create = createRoute({
  tags: ["Tasks"],
  path: "/tasks",
  method: "post",
  request: {
    body: jsonContentRequired(insertTasksSchema, "The task to create"),
  },
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(selectTasksSchema, "Create New task"),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(insertTasksSchema), "The validation error(s)"),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
