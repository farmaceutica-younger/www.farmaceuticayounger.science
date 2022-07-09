import { AdminLayout } from "components/admin/admin-layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "utils/trpc";

const EventPage = ({}) => {
  const router = useRouter();
  const eventId = router.query.eventId as string;
  const {
    data: event,
    isLoading: isLoadingEvent,
    refetch: refetchEvent,
  } = trpc.useQuery(["events.getEvent", { id: eventId }]);

  if (isLoadingEvent) {
    return <p>Loading .... </p>;
  }

  if (!event) {
    return "error";
  }

  return (
    <div>
      <AdminLayout>
        <div className="flex justify-between">
          <div>
            <h2 className="text-lg font-bold">{event?.title}</h2>
          </div>
          <div>
            <Link href={`/admin/events/${eventId}/edit`}>
              <a className="btn btn-primary">Modifica Evento</a>
            </Link>
          </div>
        </div>
        <EventTickets id={eventId} eventSlug={event?.slug} />
      </AdminLayout>
    </div>
  );
};

export default EventPage;

export const EventTickets = ({
  id,
  eventSlug,
}: {
  id: string;
  eventSlug?: string | null;
}) => {
  const { data, isLoading, refetch } = trpc.useQuery([
    "events.getEventTickets",
    { id: id, skip: 0, take: 100 },
  ]);

  if (isLoading) {
    return <p>Loading .... </p>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <p className="italic text-gray-600"> {data?.total} iscritti</p>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Data Iscrizione</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.tickets.map((t) => (
            <tr key={t.id}>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={t.avatar} alt={t.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-sm opacity-50">
                      #{pad(t.ticketNum)}
                    </div>
                  </div>
                </div>
              </td>
              <td>{t.email}</td>
              <td>{t.createdAt.toLocaleDateString()}</td>
              <th>
                {eventSlug && (
                  <Link href={`/events/${eventSlug}/tickets/${t.id}`}>
                    <a className="btn btn-ghost btn-xs">ticket</a>
                  </Link>
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function pad(value: number) {
  return `0000000000${value}`.slice(-6);
}
