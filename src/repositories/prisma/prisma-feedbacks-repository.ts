import { prisma } from "../../prisma";
import {
  feedbacksCreateData,
  feedbacksRepository,
} from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements feedbacksRepository {
  async create({ type, comment, screenshot }: feedbacksCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}
