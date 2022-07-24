import { Author, Event, EventTicket } from "@prisma/client";
import { EventPage } from "components/event";
import { Footer } from "components/footer";
import { Header } from "components/header";
import { SEO } from "components/seo";
import { Ticket } from "components/ticket";
import { GetServerSidePropsContext } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Tilt from "react-parallax-tilt";
import { db } from "services/db";
import { getEventDate } from "utils/dates";
import { readTime } from "utils/readTime";

export const ShowTicketPage = ({
  ticket,
  frontmatter,
  imageTicket,
  source,
}: Awaited<ReturnType<typeof getProps>>["props"]) => {
  return (
    <>
      <Header />
      <div className="bg-pink-500">
        <SEO
          title={`Ticket di ${ticket.name}`}
          description={`${ticket.name} parteciperà a all'evento ${frontmatter.title} di Farmaceutica Younger`}
          image={imageTicket}
          author={frontmatter.author.name}
          date={frontmatter.createdAt}
          type="article"
        />

        <div className="m-auto w-full px-2 py-6 lg:flex lg:justify-evenly">
          <div className="mx-auto my-10 grid max-w-md text-center lg:mx-4">
            <h1 className="text-3xl text-gray-100">
              <span className="font-bold">{ticket.name}</span> parteciperà
              all&apos;evento di{" "}
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

      {source && (
        <EventPage
          frontmatter={frontmatter}
          source={source}
          author={frontmatter.author}
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
      imageTicket,
    },
  };
};

const getTicketImagePreview = async (event: Event, ticket: EventTicket) => {
  const imagePublicId = `events/${event.id}/tickets/${ticket.id}`;
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/${imagePublicId}`;
};
