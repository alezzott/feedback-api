import { NodeMailerService } from "./services/EmailService";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import express from "express";
import { SubmitFeedbacksService } from "./services/SubmitFeedbacksService";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodeMailerService();
  const submitFeedbackService = new SubmitFeedbacksService(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackService.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});
