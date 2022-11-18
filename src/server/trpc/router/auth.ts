import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),

  changeName: protectedProcedure.input(
    z.object({
      name: z.string(),
    }),
  ).mutation(async ({ ctx, input }) => {
    try {
      if (!ctx.session || !ctx.session.user || !ctx.session.user.id) {
        throw new Error("not authenticated");
      }

      await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: { name: input.name },
      });
      ctx.session.user.name = input.name;

    } catch (error) { console.error(error); }
  }),

  getFriends: protectedProcedure.query(async ({ ctx }) => {
    try {

      if (!ctx.session || !ctx.session.user || !ctx.session.user.id) {
        throw new Error("not authenticated");
      }

      const friends_low = await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
      }).friends_low() || [];
      const friends_high = await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
      }).friends_high() || [];

      return [...friends_low, ...friends_high];

    } catch (error) { console.error(error); }
  }),

  unfriend: protectedProcedure.input(
    z.object({
      id: z.string(),
    }),
  ).mutation(async ({ ctx, input }) => {
    try {

      if (!ctx.session || !ctx.session.user || !ctx.session.user.id) {
        throw new Error("not authenticated");
      }

      if (ctx.session.user.id === input.id) {
        throw new Error("cannot unfriend yourself");
      }

      const [low, high] = [ctx.session.user.id, input.id].sort();

      await ctx.prisma.user.update({
        where: { id: low },
        data: { friends_high: { disconnect: { id: high } } },
      });
      await ctx.prisma.user.update({
        where: { id: high },
        data: { friends_low: { disconnect: { id: low } } },
      });

    } catch (error) { console.error(error); }
  }),

});
