import { Author, Event, EventTicket } from "@prisma/client";
import { SEO } from "components/seo";
import { Ticket } from "components/ticket";
import { getLinkedinOAUTHUrl } from "config/linkedin";
import { GetServerSidePropsContext } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { db } from "services/db";
import { getEventDate } from "utils/dates";
import { readTime } from "utils/readTime";
import p from "puppeteer";
import { v2 as cloudinary } from "cloudinary";
import { Header } from "components/header";
import { Footer } from "components/footer";
import { EventPage } from "components/event";

export const ShowTicketPage = ({
  ticket,
  frontmatter,
  linkedinUrl,
  imageTicket,
  source,
}: Awaited<ReturnType<typeof getProps>>["props"]) => {
  return (
    <>
      <Header />
      <div className="bg-pink-500">
        <SEO
          title={`Ticket di ${ticket.name}`}
          description={`${ticket.name} parteciperà a all&apos;evento ${frontmatter.title} di Farmaceutica Younger`}
          image={imageTicket}
          author={frontmatter.author.name}
          date={frontmatter.createdAt}
          type="article"
        />

        <div className="m-auto w-full px-2 py-6 lg:flex lg:justify-evenly">
          <div className="mx-auto my-10 grid max-w-md text-center lg:mx-4">
            <h1 className="text-3xl text-gray-100">
              <span className="font-bold">{ticket.name}</span> pareciperà
              all&apos;evento di{" "}
              <span className="italic">Farmaceutica Younger</span>
            </h1>
            <div className="flex flex-col">
              <a
                href={linkedinUrl}
                className="m-auto mt-10 max-w-md rounded-lg border-2 border-solid bg-white  py-4 px-6 text-2xl text-pink-500 hover:bg-pink-500 hover:text-white"
              >
                Ottieni il tuo Ticket
              </a>
            </div>
          </div>
          <div className="grid place-content-center">
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
              <Ticket
                event={{
                  date: getEventDate(
                    frontmatter.startDate,
                    frontmatter.endDate
                  ),
                  location: frontmatter.location,
                  name: frontmatter.title,
                }}
                ticket={{
                  avatar: ticket.avatar,
                  name: ticket.name,
                  role: ticket.role,
                }}
                ticketNum={ticket.ticketNum}
              />
            </Tilt>
          </div>
        </div>
      </div>

      {source && (
        <EventPage
          frontmatter={frontmatter}
          source={source}
          author={frontmatter.author}
          linkedinUrl={linkedinUrl}
        />
      )}
      <Footer />
    </>
  );
};

export default ShowTicketPage;

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<{ slug: string; id: string }>
) => {
  const slug = ctx.params?.slug!;
  const id = ctx.params?.id!;

  const event = await db.event.findFirst({
    where: { slug: slug },
    include: {
      author: true,
    },
  });
  if (!event) {
    return {
      notFound: true,
    };
  }

  const ticket = await db.eventTicket.findUnique({ where: { id: id } });
  if (!ticket) {
    return {
      redirect: `/event/${event.slug}`,
      permanent: false,
    };
  }
  return getProps(event, ticket);
};

const getProps = async (
  event: Event & {
    author: Author;
  },
  ticket: EventTicket
) => {
  const { body, ...frontMatter } = event;
  let mdxSource: MDXRemoteSerializeResult<Record<string, unknown>> | undefined;
  try {
    mdxSource = await serialize(body, {
      mdxOptions: {
        rehypePlugins: [],
      },
    });
  } catch {}

  const imageTicket = await getTicketImagePreview(event, ticket);

  return {
    props: {
      source: mdxSource,
      frontmatter: {
        ...frontMatter,
        readTime: readTime(body),
      },
      ticket,
      linkedinUrl: getLinkedinOAUTHUrl(event.id),
      imageTicket,
    },
  };
};

const getTicketImagePreview = async (
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
  };

  await page.setViewport({
    width: 1000,
    height: 500,
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
