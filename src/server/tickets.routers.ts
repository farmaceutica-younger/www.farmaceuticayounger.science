import { Event, EventTicket, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { BuildQuestionairreSchema } from "components/questionairre/schema";
import { getUserEmail, getUserProfile } from "utils/linkedin";
import { z } from "zod";
import { createRouter } from "./router";
import crypto from "crypto";
import { Author } from "feed";
import { cloudinary } from "services/cloudinary";
import { getEventDate } from "utils/dates";
import p from "puppeteer";
import { bot } from "services/bot";
import { kannon } from "services/sender";
import { resizeCloudinaryImage } from "utils/cloudinary-url";

export const ticketRouter = createRouter().mutation("createTicket", {
  input: z.object({
    form: z.any(),
    eventId: z.string(),
    linkedinToken: z.string(),
  }),
  async resolve({ input, ctx }) {
    const event = await ctx.db.event.findUnique({
      where: { id: input.eventId },
      include: { author: true },
    });

    if (!event) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    const ticket = await getOrCreateTicket(
      ctx.db,
      input.linkedinToken,
      event,
      input.form
    );
    return ticket;
  },
});

async function getOrCreateTicket(
  prisma: PrismaClient,
  linkedinToken: string,
  event: Event & { author: Author },
  form: any
) {
  const profile = await getUserProfile(linkedinToken);
  const email = await getUserEmail(linkedinToken);

  const total = await prisma.eventTicket.count({
    where: { eventId: event.id },
  });
  const name = `${profile.firstName} ${profile.lastName}`.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    ""
  );

  const schema = BuildQuestionairreSchema(
    (event.questionairre as any).questions
  );

  const eventToken = crypto.randomBytes(64).toString("hex");

  const parsedForm = schema.parse(form);

  const ticket = await prisma.eventTicket.upsert({
    create: {
      avatar: profile.profileImageURL,
      email: email,
      name: name,
      role: "",
      ticketNum: total + 1,
      eventId: event.id,
      answers: parsedForm,
      token: eventToken,
    },
    update: {
      avatar: profile.profileImageURL,
      name: name,
      answers: parsedForm,
    },
    where: {
      email: email,
    },
  });
  const image = await createTicketImagePreview(event, ticket);
  const url = `https://farmaceuticayounger.science/events/${event.slug}/tickets/${ticket.id}/success?token=${ticket.token}`;

  await kannon.sendMail(
    [ticket.email],
    "[Farmaceutica Younger] Ecco il tuo Biglietto",
    registerdEmail(resizeCloudinaryImage(image, 600), url)
  );

  bot.sendToAdmin(`
Nuovo Utente registrato all'evento ${event.title}:

Email: ${ticket.email}
Name: ${ticket.name}

https://www.farmaceuticayounger.science/events/${event.slug}/tickets/${ticket.id}
  `);
  return ticket;
}

const createTicketImagePreview = async (
  event: Event & {
    author: Author;
  },
  ticket: EventTicket
) => {
  const imagePublicId = `events/${event.id}/tickets/${ticket.id}`;
  const exists = await checkIfimageExists(imagePublicId);

  if (!exists) {
    const s = await createScreen(event, ticket);
    await new Promise<void>((resolve, reject) => {
      const str = cloudinary.uploader.upload_stream(
        {
          public_id: imagePublicId,
        },
        (err, r) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve();
        }
      );
      str.end(s);
    });
  }

  return `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/${imagePublicId}`;
};

const checkIfimageExists = async (id: string) => {
  try {
    const resImage: any = await cloudinary.api.resource(id);
    return !resImage.error;
  } catch (e) {
    return false;
  }
};

interface Query {
  date: string;
  location: string;
  eventName: string;
  avatar: string;
  name: string;
  role: string;
  ticketNum: number;
}

const createScreen = async (event: Event, ticket: EventTicket) => {
  const browser = await p.launch({
    args: minArgs,
    headless: true,
  });
  const page = await browser.newPage();

  const q: Query = {
    date: getEventDate(event.startDate, event.endDate),
    avatar: ticket.avatar,
    eventName: event.title,
    location: event.location,
    name: ticket.name,
    role: ticket.role,
    ticketNum: ticket.ticketNum,
  };

  await page.setViewport({
    width: 1040,
    height: 540,
  });

  const url = new URL("_i/ticket", "http://localhost:3000");
  for (const [key, value] of Object.entries(q)) {
    url.searchParams.append(key, value);
  }

  await page.goto(url.href);

  const res = await page.screenshot({
    encoding: "binary",
    type: "png",
    omitBackground: true,
  });

  await browser.close();
  return res as Buffer;
};

const minArgs = [
  "--autoplay-policy=user-gesture-required",
  "--disable-background-networking",
  "--disable-background-timer-throttling",
  "--disable-backgrounding-occluded-windows",
  "--disable-breakpad",
  "--disable-client-side-phishing-detection",
  "--disable-component-update",
  "--disable-default-apps",
  "--disable-dev-shm-usage",
  "--disable-domain-reliability",
  "--disable-extensions",
  "--disable-features=AudioServiceOutOfProcess",
  "--disable-hang-monitor",
  "--disable-ipc-flooding-protection",
  "--disable-notifications",
  "--disable-offer-store-unmasked-wallet-cards",
  "--disable-popup-blocking",
  "--disable-print-preview",
  "--disable-prompt-on-repost",
  "--disable-renderer-backgrounding",
  "--disable-setuid-sandbox",
  "--disable-speech-api",
  "--disable-sync",
  "--hide-scrollbars",
  "--ignore-gpu-blacklist",
  "--metrics-recording-only",
  "--mute-audio",
  "--no-default-browser-check",
  "--no-first-run",
  "--no-pings",
  "--no-sandbox",
  "--no-zygote",
  "--password-store=basic",
  "--use-gl=swiftshader",
  "--use-mock-keychain",
  "--disable-web-security",
];

const registerdEmail = (image: string, url: string) => {
  return `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
  body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
  table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
  img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
  p { display:block;margin:13px 0; }</style><!--[if mso]>
<noscript>
<xml>
<o:OfficeDocumentSettings>
  <o:AllowPNG/>
  <o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
</noscript>
<![endif]--><!--[if lte mso 11]>
<style type="text/css">
  .mj-outlook-group-fix { width:100% !important; }
</style>
<![endif]--><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"><style type="text/css">@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);</style><!--<![endif]--><style type="text/css">@media only screen and (min-width:480px) {
.mj-column-per-100 { width:100% !important; max-width: 100%; }
}</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type="text/css">@media only screen and (max-width:480px) {
table.mj-full-width-mobile { width: 100% !important; }
td.mj-full-width-mobile { width: auto !important; }
}</style></head><body style="word-spacing:normal;"><div><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#EC4899;background-color:#EC4899;width:100%;"><tbody><tr><td><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#EC4899" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:550px;"><img height="auto" src="${image}" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="550"></td></tr></tbody></table></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:helvetica;font-size:16px;line-height:1;text-align:left;color:white;">Ecco a te il tuo personalissimo Ticket! Che ti consentirà di partecipare al prossimo evento di Farmaceutica Younger</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:helvetica;font-size:16px;line-height:1;text-align:left;color:white;"><div>Ora non ti resta che...</div><ol><li>Condidere l'evento con amici e colleghi,</li><li>Preparti per l'evento più figo!</li></ol></div></td></tr><tr><td align="center" vertical-align="middle" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;"><tr><td align="center" bgcolor="#414141" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#414141;" valign="middle"><a href="${url}" style="display:inline-block;background:#414141;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;" target="_blank">Gestisci il tuo biglietto da qui</a></td></tr></table></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div></body></html>`;
};
