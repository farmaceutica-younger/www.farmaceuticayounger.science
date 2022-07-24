import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import { Event } from "@prisma/client";
import { AdminLayout } from "components/admin/admin-layout";
import { CreateEvent, CreateEventForm } from "components/events/create-event";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { resizeCloudinaryImage } from "utils/cloudinary-url";
import { trpc } from "utils/trpc";

const AdminEventsPage = () => {
  const { data, refetch: refetchEvents } = trpc.useQuery([
    "events.getEvents",
    { skip: 0, take: 20 },
  ]);

  if (!data) {
    return <p>loading...</p>;
  }
  const { events } = data;

  return <EventsList events={events} />;
};

export default AdminEventsPage;

AdminEventsPage.Layout = AdminLayout;

interface EventsListProps {
  events: Event[];
}

export const EventsList = ({ events }: EventsListProps) => {
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const { mutateAsync: createEvent } = trpc.useMutation("events.createEvent");
  const router = useRouter();

  const create = useCallback(
    async (value: CreateEvent) => {
      const res = await createEvent({ data: value });
      await router.push(`/admin/events/${res.id}`);
    },
    [createEvent]
  );

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => setShowCreateEvent(true)}
      >
        Crea un nuovo evento
      </button>
      <ul className="">
        {events.map((p) => (
          <li key={p.id} className="mt-4">
            <Link href={`/admin/events/${p.id}`}>
              <a className="flex cursor-pointer gap-2 align-middle hover:bg-slate-200">
                <img
                  className="w-32"
                  src={resizeCloudinaryImage(p.featuredImage, 100)}
                  alt={p.title}
                />
                <div>
                  <div className="mb-2">
                    {!!p.slug ? (
                      <span className="rounded-full bg-green-200 px-2 py-1 text-xs text-green-600">
                        pubblicato
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-200 px-2 py-1 text-xs text-blue-600">
                        non pubblicato
                      </span>
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

      <Dialog
        open={showCreateEvent}
        onClose={() => setShowCreateEvent(false)}
        className="fixed inset-0 z-50 overflow-y-auto "
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="fixed inset-28 overflow-auto rounded bg-white p-10 shadow-xl ring-1">
          <CreateEventForm
            abort={() => setShowCreateEvent(false)}
            onSubmit={create}
          />
          <button
            onClick={() => setShowCreateEvent(false)}
            className="absolute top-4 right-4 grid h-10 w-10 place-content-center rounded-full hover:bg-slate-200"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>
      </Dialog>
    </div>
  );
};
