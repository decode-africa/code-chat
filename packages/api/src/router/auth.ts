import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(async ({ctx}) => {
    const user = await ctx.prisma.user.findFirst({ where: {
      name: 'Bright Williams'
    }});
    
    return user;
  }),
  getOpenMessage: protectedProcedure.query(() => {
    return "You are on an open channel";
  }),
});
