import axios from "axios";

export class EmailSender {
  async sendEmail(
    recipient: string,
    subject: string,
    body: string
  ): Promise<void> {
    console.log(`Sending email to ${recipient} with subject: ${subject}`);

    const apiKey = process.env.EMAIL_TOKEN;
    const emailURL = process.env.EMAIL_URL;

    const headers = {
      Accept: "application/json",
      "api-key": apiKey,
      "Content-Type": "application/json",
    };

    const emailData = {
      sender: {
        name: "Fast Food SOAT1",
        email: "fast-food@bevo.com",
      },
      to: [{ email: recipient }],
      subject: subject,
      htmlContent: body,
    };

    try {
      const response = await axios.post(emailURL, emailData, { headers });
      console.log("Email sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending email:", error.response.data);
      throw new Error("Failed to send email");
    }
  }
}
