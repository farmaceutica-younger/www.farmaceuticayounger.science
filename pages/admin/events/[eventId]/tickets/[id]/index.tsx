import { Author, Event, EventTicket } from "@prisma/client";
import { AdminLayout } from "components/admin/admin-layout";
import { QuestionairreSchema } from "components/questionairre/schema";
import { Ticket } from "components/ticket";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { db } from "services/db";
import { getEventDate } from "utils/dates";

type Props = Awaited<ReturnType<typeof getProps>>["props"];

export const ShowTicketPage = ({ ticket, event }: Props) => {
  return (
    <AdminLayout>
      <div className="">
        <div className="m-auto w-full px-2 py-6 lg:flex lg:justify-evenly">
          <div className="mx-auto my-10 grid max-w-md text-center lg:mx-4">
            <h1 className="text-3xl">
              <span className="font-bold">{ticket.name}</span> parteciperà
              all&apos;evento di{" "}
              <span className="italic">Farmaceutica Younger</span>
            </h1>
          </div>
          <div className="grid place-content-center">
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
              <Ticket
                event={{
                  date: getEventDate(event.startDate, event.endDate),
                  location: event.location,
                  name: event.title,
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
        <div>
          <TicketInfo event={event} ticket={ticket} />
        </div>
      </div>
    </AdminLayout>
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
  const questionairre = QuestionairreSchema.parse(event.questionairre);
  const answers = ticket.answers as {
    [x: string]: any;
  };
  return {
    props: {
      ticket: {
        ...ticket,
        answers,
      },
      event: {
        ...event,
        questionairre,
      },
    },
  };
};

const TicketInfo = ({ ticket, event }: Props) => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="flex justify-between">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Informazioni sul biglietto
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Dettagli contenuti nei biglietto
          </p>
        </div>

        <Link href={`/events/${event.slug}/tickets/${ticket.id}`}>
          <a className="btn btn-ghost btn-xs"> Vai al Ticket </a>
        </Link>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Nome</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {ticket.name}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Avatar</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <div className="avatar">
                <div className="mask mask-squircle w-12">
                  <img src={ticket.avatar} />
                </div>
              </div>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {ticket.email}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Numero Biglietto
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {ticket.ticketNum}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Creazione</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {ticket.createdAt.toISOString()}
            </dd>
          </div>
          {event.questionairre.questions.map((question) => (
            <div
              key={question.cuid}
              className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6"
            >
              <dt className="text-sm font-medium text-gray-500">
                {question.description}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {ticket.answers[question.cuid]}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
