import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const essaysRouter = createTRPCRouter({
  // This is currently a publicProcedure however we do not want all the users to be able to see the essay so in the future we should chagnge this
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.essay.findMany();
  }),
});
