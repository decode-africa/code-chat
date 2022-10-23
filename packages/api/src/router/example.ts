import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    if (ctx.session?.expires)
      throw new TRPCError({
        message: "You cannot do that",
        code: "BAD_REQUEST",
      });
    return ctx.prisma.example.findMany();
  }),
});
