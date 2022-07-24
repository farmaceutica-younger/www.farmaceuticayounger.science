import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import { AdminLayout } from "components/admin/admin-layout";
import { QuestionairreForm } from "components/questionairre/form";
import { QuestionairreBuilder } from "components/questionairre/form-builder";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "utils/trpc";

const QuestionairePage = () => {
  const router = useRouter();
  const eventId = router.query.eventId as string;
  const { mutateAsync: setQuestionairre } = trpc.useMutation([
    "events.setEventQuestionairre",
  ]);
  const [showPreview, setShowPreview] = useState(false);

  const {
    data: event,
    isLoading: isLoadingEvent,
    refetch: refetchEvent,
  } = trpc.useQuery(["events.getEvent", { id: eventId }]);

  const { data: author, isLoading: isLoadingAuthor } = trpc.useQuery([
    "author.getAuthor",
  ]);

  if (isLoadingEvent || isLoadingAuthor) {
    return <p>Loading .... </p>;
  }

  if (!event) {
    return "error";
  }

  return (
    <AdminLayout>
      <div className="">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl ">
            Gestisci Questionario di{" "}
            <span className="font-bold italic">{event.title}</span>
          </h2>
          <div>
            <Link href={`/admin/events/${event.id}`}>
              <a className="btn btn-ghost"> Indietro </a>
            </Link>
            <button
              onClick={() => setShowPreview(true)}
              className="btn btn-outline btn-primary"
            >
              {" "}
              Preview
            </button>
          </div>
        </div>

        <div className="m-auto mt-10 w-full">
          <QuestionairreBuilder
            questionairre={event.questionairre as any}
            onSave={async (value) => {
              await setQuestionairre({
                id: event.id,
                questionairre: value,
              });
            }}
          />
        </div>
      </div>

      <Dialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        className="fixed inset-0 z-50 overflow-y-auto "
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="fixed inset-28 overflow-auto rounded bg-white p-10 shadow-xl ring-1">
          <button
            onClick={() => setShowPreview(false)}
            className="absolute top-4 right-4 grid h-10 w-10 place-content-center rounded-full hover:bg-slate-200"
          >
            <XIcon className="h-6 w-6" />
          </button>
          <QuestionairreForm
            title={event.title}
            questionairre={event.questionairre as any}
            onSumbit={async () => {}}
            submitText="Ottieni il tuo Ticket"
          />
        </div>
      </Dialog>
    </AdminLayout>
  );
};

export default QuestionairePage;
