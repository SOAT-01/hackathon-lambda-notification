import { SQSEvent } from "aws-lambda";
import { EmailUseCase } from "./usecases/emailUseCase";
import { assertArgumentIsValidEmail } from "@/utils/assertionConcern";

const sendEmail = async (event: SQSEvent) => {
  for (const record of event.Records) {
    try {
      const { usuarioEmail, pontos } = JSON.parse(record.body || "{}");

      const emailUseCase = new EmailUseCase();

      const isValidEmail = assertArgumentIsValidEmail(usuarioEmail);

      if (!isValidEmail) {
        console.error(
          "Skipping message: Incorrect e-mail format, ex: abx@xyz.com"
        );
        throw new Error("Incorrect e-mail format, ex: email@email.com");
      }

      if (!pontos || pontos.length === 0) {
        console.error("Skipping message: No data to process");
        throw new Error("No data to process");
      }

      await emailUseCase.sendEmail(usuarioEmail, pontos);
    } catch (error) {
      console.error("Error processing messages:", error);
      throw error;
    }
  }
};

module.exports.handler = sendEmail;
