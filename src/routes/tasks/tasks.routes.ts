import { createRoute, z } from "@hono/zod-openapi";
import * as HTTPStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentOneOf, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import { insertTasksSchema, patchTasksSchema, selectTasksSchema } from "@/db/schema";
import { notFoundSchema } from "@/lib/constants";

const tags = ["Tasks"];

export const list = createRoute({
  tags,
  path: "/tasks",
  method: "get",
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(z.array(selectTasksSchema), "The list of tasks"),
  },
});

export const create = createRoute({
  tags,
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

export const getOne = createRoute({
  tags,
  path: "/tasks/{id}",
  method: "get",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(selectTasksSchema, "Get Specific Task By ID"),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(IdParamsSchema), "Invalid ID param"),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Task Not Found"),
  },
});

export const patch = createRoute({
  tags,
  path: "/tasks/{id}",
  method: "patch",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(patchTasksSchema, "The task updates"),
  },
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(selectTasksSchema, "Updated Task"),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf([createErrorSchema(IdParamsSchema), createErrorSchema(patchTasksSchema)], "The validation error(s)"),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Task Not Found"),
  },
});

export const remove = createRoute({
  path: "/tasks/{id}",
  method: "delete",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HTTPStatusCodes.NO_CONTENT]: {
      description: "Task deleted",
    },
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Task not found",
    ),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
