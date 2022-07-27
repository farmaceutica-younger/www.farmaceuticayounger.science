import { getConfigs } from "env-ts-conf";
import * as api from "../src/proto/kannon/mailer";
import * as grpc from "@grpc/grpc-js";
import { promisifyAll } from "./grpc-promisify";

export const senderConfig = getConfigs({
  apiUrl: {
    type: "string",
    variableName: "KANNAN_API_URL",
  },
  skipTls: {
    type: "boolean",
    variableName: "KANNAN_SKIP_TLS",
    default: false,
  },
  token: {
    type: "string",
    variableName: "KANNON_TOKEN",
  },
  fromAlias: {
    type: "string",
    variableName: "KANNON_FROM_ALIAS",
  },
  fromEmail: {
    type: "string",
    variableName: "KANNON_FROM_EMAIL",
  },
});

const NewMailer = (apiUrl: string, skipSSL: boolean): MailerCli => {
  const credentials = skipSSL
    ? grpc.credentials.createInsecure()
    : grpc.credentials.createSsl();
  const client = new api.MailerClient(apiUrl, credentials);
  return promisifyAll(client);
};

export type MailerCli = promisifyAll<api.MailerClient>;

class Mailer {
  private mailer: MailerCli;

  constructor(
    apiUrl: string,
    skipSSL: boolean,
    private readonly senderEmail: string,
    private readonly senderAlias: string,
    private readonly token: string
  ) {
    this.mailer = NewMailer(apiUrl, skipSSL);
  }

  async sendMail(
    to: string[],
    subject: string,
    html: string,
    scheduledTime = new Date()
  ) {
    const meta = new grpc.Metadata();
    meta.add("authorization", "Basic " + this.token);
    return await this.mailer.sendHTML(
      {
        html,
        sender: {
          alias: this.senderAlias,
          email: this.senderEmail,
        },
        subject: subject,
        to: to,
        scheduledTime,
      },
      meta
    );
  }
}

export const kannon = new Mailer(
  senderConfig.apiUrl,
  senderConfig.skipTls,
  senderConfig.fromEmail,
  senderConfig.fromAlias,
  senderConfig.token
);
