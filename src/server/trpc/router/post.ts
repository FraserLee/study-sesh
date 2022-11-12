import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../trpc";



export const postRouter = router({
    post: protectedProcedure.input(
      z.object({
        name: z.string(),
        message: z.string(),
      })
    ).mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.postModel.create({
          data: {
            name: input.name,
            message: input.message,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),

    getAllPosts: publicProcedure.query(async ({ ctx }) => {
      try {
        return await ctx.prisma.postModel.findMany({
          orderBy: {
            createdAt: "desc",
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});


/* 
export const exampleRouter = router({

  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});

*/
