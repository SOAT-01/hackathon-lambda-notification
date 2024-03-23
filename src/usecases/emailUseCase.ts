// usecases/emailService.ts
import { RegistroDePonto } from "@/interfaces/RegistroDePonto";
import { EmailSender } from "../gateways/emailSender";

export class EmailUseCase {
  private emailSender: EmailSender;

  constructor() {
    this.emailSender = new EmailSender();
  }

  async sendEmail(email: string, data: RegistroDePonto[]): Promise<void> {
    const body = data
      .map((item) => {
        return ` <tr>
      <td>${item.data}</td>
      <td>${item.entrada}</td>
      <td>${item.saidaAlmoco}</td>
      <td>${item.entradaAlmoco}</td>
      <td>${item.saida}</td>
      <td>${item.totalHoras}</td>
    </tr>`;
      })
      .join("");

    const htmlMsg = `<html>
    <head></head>
    <body>
      <p>Olá, segue abaixo o registro dos pontos desse mês:</p>
      <table border="1">
        <thead>
          <tr>
            <th>Data</th>
            <th>Entrada</th>
            <th>Saída para almoço</th>
            <th>Entrada pós almoço</th>
            <th>Saída</th>
            <th>Total de horas</th>
          </tr>
        </thead>
        <tbody>
          ${body}
        </tbody>
      </table>
    </body>
    </html>`;
    await this.emailSender.sendEmail(
      email,
      "Relatório de pontos do mês",
      htmlMsg
    );
  }
}
