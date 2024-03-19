import { RegistroDePonto } from "./interfaces/RegistroDePonto";
import { EmailUseCase } from "./usecases/emailUseCase";
import { assertArgumentIsValidEmail } from "@/utils/assertionConcern";

const sendEmail = async (event: { email: string; data: RegistroDePonto[] }) => {
  try {
    const { email, data } = event;
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
};

module.exports.handler = sendEmail;
