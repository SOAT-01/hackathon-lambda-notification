import { SQSEvent } from "aws-lambda";
import { EmailUseCase } from "./usecases/emailUseCase";
import { assertArgumentIsValidEmail } from "@/utils/assertionConcern";

const sendEmail = async (event: SQSEvent) => {
  for (const record of event.Records) {
    try {
      const { email, data } = JSON.parse(record.body || "{}");

      const emailUseCase = new EmailUseCase();

      const isValidEmail = assertArgumentIsValidEmail(email);

      if (!isValidEmail) {
        console.error(
          "Skipping message: Incorrect e-mail format, ex: abx@xyz.com"
        );
        throw new Error("Incorrect e-mail format, ex: email@email.com");
      }

      if (!data || data.length === 0) {
        console.error("Skipping message: No data to process");
        throw new Error("No data to process");
      }

      await emailUseCase.sendEmail(email, data);
    } catch (error) {
      console.error("Error processing messages:", error);
      throw error;
    }
  }
};

module.exports.handler = sendEmail;
