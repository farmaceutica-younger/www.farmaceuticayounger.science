import { Event, EventTicket } from "@prisma/client";
import { NextApiHandler } from "next";
import p from "puppeteer";
import { cloudinary, cloudinaryConfig } from "services/cloudinary";
import { db } from "services/db";
import { getEventDate } from "utils/dates";

const handler: NextApiHandler = async (req, res) => {
  const { eventId, ticketId } = req.query as unknown as {
    eventId: string;
    ticketId: string;
  };

  const event = await db.event.findUnique({
    where: { id: eventId },
    include: {
      tickets: {
        where: {
          id: ticketId,
        },
      },
    },
  });

  if (!event || !event.tickets[0]) {
    res.status(404).send("Ticket not found");
    return;
  }

  const ticket = event.tickets[0];

  const imagePublicId = `events/${event.id}/tickets/${ticket.id}`;
  const exists = await checkIfimageExists(imagePublicId);
  // const s = await createScreen(event, ticket);

  // fs.writeFileSync("/tmp/tmp.png", s);

  // res.writeHead(200, {
  //   "content-type": "image/png",
  //   "Content-Length": s.length,
  // });

  // const stream = Readable.from(s.toString());
  // stream.pipe(res);

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

  res.redirect(
    `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${imagePublicId}`
  );
};

export default handler;

interface Query {
  date: string;
  location: string;
  eventName: string;
  avatar: string;
  name: string;
  role: string;
}

const checkIfimageExists = async (id: string) => {
  try {
    const resImage: any = await cloudinary.api.resource(id);
    return !resImage.error;
  } catch (e) {
    return false;
  }
};

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
  };

  await page.setViewport({
    width: 1000,
    height: 500,
  });

  const url = new URL("_i/ticket", "http://localhost:3000");
  for (const [key, value] of Object.entries(q)) {
    url.searchParams.append(key, value);
  }

  console.log(url.href);

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
