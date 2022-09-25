import { NextApiRequest } from "next";
import { z } from "zod";

const errorMap: z.ZodErrorMap = (error, ctx) => {
  let message = ctx.defaultError;
  const { path, code } = error;
  switch (code) {
    case z.ZodIssueCode.invalid_type:
      if (error.received === "undefined") {
        message = `${path.join(".")} is required`;
      } else {
        const field = path.join(".");
        const { expected, received } = error;
        message = `Expected ${expected} got ${received}: ${field}`;
      }
  }
  return { message };
};

export const validateSchema = (
  req: NextApiRequest,
  schema: z.SomeZodObject
) => {
  const schemaPayload = {
    query: req.query,
    body: req.body,
  };
  const schemaResult = schema.safeParse(schemaPayload, { errorMap });
  if (!schemaResult.success) {
    throw new Error(schemaResult.error.issues[0]?.message);
  }
};
