import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const formRouter = createTRPCRouter({
  submit: publicProcedure
    .input(
      z.object({
        gpa: z.number().min(0).max(4.3),
        intendedMajor: z.string(),
        academicProgram: z.string(),
        curriculumRanking: z.number().int().min(1).max(10),
        studyAbroadRanking: z.number().int().min(1).max(10),
        graduateSchoolRanking: z.number().int().min(1).max(10),
        academicSupportRanking: z.number().int().min(1).max(10),
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const {
        gpa,
        intendedMajor,
        academicProgram,
        curriculumRanking,
        studyAbroadRanking,
        graduateSchoolRanking,
        academicSupportRanking,
        userId,
      } = input;

      await prisma.studentProfile.create({
        data: {
          gpa,
          intendedMajor,
          academicProgram,
          curriculumRanking,
          studyAbroadRanking,
          graduateSchoolRanking,
          academicSupportRanking,
          userId,
        },
      });
    }),
});
