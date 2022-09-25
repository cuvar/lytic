import { createRouter } from "./context";
import { z } from "zod";

export const userRouter = createRouter()
  // .query("hello", {
  //   input: z
  //     .object({
  //       text: z.string().nullish(),
  //     })
  //     .nullish(),
  //   resolve({ input }) {
  //     return {
  //       greeting: `Hello ${input?.text ?? "world"}`,
  //     };
  //   },
  // })
  .query("getAll", {
    async resolve({ ctx }) {
      try {
        const sites = await ctx.prisma.lytic.findMany({
          select: {
            name: true,
            website: true,
            clicks: true,
          },
        });
        return sites;
      } catch (error) {
        return [];
      }
    },
  })
  .mutation("updateById", {
    input: z.object({
      name: z.string(),
      clicks: z.number(),
    }),
    async resolve({ ctx, input }) {
      try {
        const ret = await ctx.prisma.lytic.update({
          where: {
            name: input.name,
          },
          data: {
            clicks: input.clicks,
          },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
  });
