import { Event } from "@prisma/client";
import { AdminLayout } from "components/admin/admin-layout";
import Link from "next/link";
import { trpc } from "utils/trpc";

const AdminEventsPage = () => {
  const { data, refetch: refetchEvents } = trpc.useQuery([
    "events.getEvents",
    { skip: 0, take: 20 },
  ]);
  const { mutateAsync: publishEventMut } = trpc.useMutation([
    "events.publishEvent",
  ]);

  const publishEvent = async (eventID: string) => {
    await publishEventMut({ id: eventID });
    await refetchEvents();
  };

  if (!data) {
    return <p>loading...</p>;
  }
  const { events } = data;

  return <EventsList events={events} publish={publishEvent} />;
};

export default AdminEventsPage;

AdminEventsPage.Layout = AdminLayout;

interface EventsListProps {
  events: Event[];
  publish: (eventId: string) => void;
}

export const EventsList = ({ events, publish }: EventsListProps) => {
  return (
    <div>
      <Link href="/admin/events/new">
        <a className="bg-blue-600 px-4 py-2 text-blue-100 hover:bg-blue-800">
          Crea un nuovo evento
        </a>
      </Link>
      <ul className="">
        {events.map((p) => (
          <li key={p.id} className="mt-4">
            <Link href={`/admin/events/${p.id}/edit`}>
              <a className="flex cursor-pointer gap-2 align-middle hover:bg-slate-200">
                <img className="w-32" src={p.featuredImage} alt={p.title} />
                <div>
                  <div className="mb-2">
                    {!!p.path ? (
                      <span className="rounded-full bg-green-200 px-2 py-1 text-xs text-green-600">
                        pubblicato
                      </span>
                    ) : (
                      <button
                        className="cursor-pointer rounded-full bg-blue-600 px-2 py-1 text-xs text-blue-200 hover:bg-blue-800"
                        onClick={(e) => {
                          e.preventDefault();
                          publish(p.id);
                        }}
                      >
                        {" "}
                        Pubblica{" "}
                      </button>
                    )}
                  </div>
                  <h4 className="text-sm text-stone-800">{p.title}</h4>
                  <p className="text-sm text-stone-600"> {p.description}</p>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
