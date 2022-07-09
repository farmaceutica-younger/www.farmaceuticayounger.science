import { Author, Event, EventTicket } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { EventPage } from "components/event";
import { Footer } from "components/footer";
import { Header } from "components/header";
import { SEO } from "components/seo";
import { Ticket } from "components/ticket";
import { GetServerSidePropsContext } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import p from "puppeteer";
import Tilt from "react-parallax-tilt";
import { db } from "services/db";
import { getEventDate } from "utils/dates";
import { readTime } from "utils/readTime";

export const ShowTicketPage = ({
  ticket,
  frontmatter,
}: Awaited<ReturnType<typeof getProps>>["props"]) => {
  const url = `https://www.farmaceuticayounger.science/events/${frontmatter.slug}/tickets/${ticket.id}`;
  const title = `${ticket.name} parteciperà all'evento di Farmaceutica Younger`;

  const linkedinUrl = `https://www.linkedin.com/shareArticle?url=${url}&title=${title}`;
  const whatsappUrl = `https://api.whatsapp.com/send?&text=${title} ${url}`;
  const telegramUrl = `https://telegram.me/share/url?url=${url}&text=${title}`;
  return (
    <>
      <Header />
      <div className="bg-pink-500">
        <SEO
          title={`Ticket di ${ticket.name}`}
          description={`${ticket.name} parteciperà a all'evento ${frontmatter.title} di Farmaceutica Younger`}
          author={frontmatter.author.name}
          date={frontmatter.createdAt}
          type="article"
        />

        <div className="m-auto w-full px-2 py-6 lg:flex lg:justify-evenly">
          <div className="mx-auto my-10 grid max-w-md text-center lg:mx-4">
            <h1 className="text-3xl text-gray-100">
              Ecco il tuo ticket per l'evento di{" "}
              <span className="italic">Farmaceutica Younger</span>
            </h1>
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
      <div className="prose m-auto mt-10 max-w-md">
        <p>
          Abbiamo mandato una mail a <em>{ticket.email}</em> per confermare il
          tuo invito, controlla nello SPAM se non ti arriva!
        </p>
        <p>
          Fai sapere alla tua rete di contatti che parteciperai a questo evento.
          Condividi il ticket tramite la tua piattaforma social preferita!
        </p>

        <div className="not-prose flex flex-col">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary btn-sm mt-2"
          >
            Condivid con Linkedin
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary btn-sm mt-2"
          >
            Condivid con Whatsapp
          </a>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary btn-sm mt-2"
          >
            Condivid con Telegram
          </a>
        </div>
      </div>
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
  const { body, ...frontmatter } = event;

  return {
    props: {
      frontmatter,
      ticket,
    },
  };
};
