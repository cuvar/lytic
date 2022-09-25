import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export type NextApiResponseWithData<TData extends z.ZodTypeAny = z.ZodTypeAny> =
  NextApiResponse<ApiResult<TData>> & {
    data: (body: z.TypeOf<TData>) => void;
  };

type ApiRequest<TSchema extends z.AnyZodObject = z.AnyZodObject> = Omit<
  NextApiRequest,
  "query" | "body"
> & {
  body: z.infer<TSchema>["body"];
  query: Partial<z.infer<TSchema>["query"]>;
};

type ApiResult<TData extends z.ZodTypeAny> =
  | (TData extends void
      ? { success: true }
      : { success: true; data: z.infer<TData> })
  | { success: false; error: string };

type ApiResponse<TData extends z.ZodTypeAny> = NextApiResponseWithData<TData>;

export type ApiHandler<
  TRequest extends z.AnyZodObject = z.AnyZodObject,
  TResponse extends z.ZodTypeAny = z.ZodTypeAny
> = (
  req: ApiRequest<TRequest>,
  res: ApiResponse<TResponse>
) => void | Promise<void>;
