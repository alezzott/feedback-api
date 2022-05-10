import { feedbacksRepository } from "../repositories/feedbacks-repository";
import { MailAdapter } from "../adapters/mail-adapter";

interface SubmitFeedbacksServiceRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbacksService {
  constructor(
    private feedbacksRepository: feedbacksRepository,
    private mailService: MailAdapter
  ) {}

  async execute(request: SubmitFeedbacksServiceRequest) {
    const { type, comment, screenshot } = request;

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailService.sendMail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: serif; font-size: 16px; color: #222;">`,
        `<p>Tipo do feedback ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : "",
      ].join("\n"),
    });
  }
}
