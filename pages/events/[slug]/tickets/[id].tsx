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

export const ShowTicketPage = ({
  ticket,
  frontmatter,
  linkedinUrl,
}: Awaited<ReturnType<typeof getProps>>["props"]) => {
  const image = `/api/tickets/ticket?eventId=${frontmatter.id}&ticketId=${ticket.id}`;
  return (
    <>
      <SEO
        title={`Ticket di ${ticket.name}`}
        description={`${ticket.name} parteciperà a all'evento ${frontmatter.title} di Farmaceutica Younger`}
        image={`/api/tickets/ticket?eventId=${frontmatter.id}&ticketId=${ticket.id}`}
        author={frontmatter.author.name}
        date={frontmatter.createdAt}
        type="article"
      />

      <div className="grid h-screen bg-pink-600 md:grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
        <div className="grid content-center p-10 text-center">
          <h1 className="text-2xl text-gray-100">
            {ticket.name} pareciperà all'evento di
          </h1>
          <h2 className="mt-3 text-3xl font-bold text-gray-100">
            Famraceutica Younger
          </h2>
          <a
            href={linkedinUrl}
            className="m-auto mt-10 max-w-md rounded-lg border-2 border-solid border-red-200  py-4 px-6 text-2xl text-white hover:bg-gray-200 hover:text-gray-800"
          >
            Crea il tuo con linkedin
          </a>
          <Link href={`/events/${frontmatter.slug}`}>
            <a className="m-auto mt-10 max-w-md rounded-lg border-2 border-solid border-red-200  py-4 px-6 text-2xl text-white hover:bg-gray-200 hover:text-gray-800">
              {" "}
              Dettagli dell'evento
            </a>
          </Link>
        </div>
        <div className="grid place-content-center overflow-hidden">
          <div className="">
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

  return {
    props: {
      source: mdxSource,
      frontmatter: {
        ...frontMatter,
        readTime: readTime(body),
      },
      ticket,
      linkedinUrl: getLinkedinOAUTHUrl(event.id),
    },
  };
};
