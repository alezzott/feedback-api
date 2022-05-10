import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../adapters/mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "301e716ba4e5ee",
    pass: "bc82fc98ad8cdf",
  },
});

export class NodeMailerService implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Test FeedBack from <oi@test.com>",
      to: "alezzott <from@feedback.com>",
      subject,
      html: body,
    });
  }
}
