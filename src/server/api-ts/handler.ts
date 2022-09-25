import { captureException } from "@sentry/nextjs";
import { StatusCodes } from "http-status-codes";
import { NextApiRequest } from "next";
import { z } from "zod";

import { NextApiResponseWithData } from ".";
import { validateSchema } from "./validateSchema";

type RootOptions = {
  schema?: z.SomeZodObject;
};

type RootHandler = (
  handler: (
    req: NextApiRequest,
    res: NextApiResponseWithData
  ) => void | Promise<void>,
  options?: RootOptions
) => (
  req: NextApiRequest,
  res: NextApiResponseWithData
) => void | Promise<void>;

export const handle: RootHandler = (handler, options) => async (req, res) => {
  try {
    if (options?.schema) validateSchema(req, options.schema);
    await handler(req, res); // Run the actual handler
  } catch (e) {
    captureException(e);
    console.log("error caught in handler:", e);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: (e as Error).message });
  }
};
