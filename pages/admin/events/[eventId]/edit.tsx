import { EventForm } from "components/form/event-form";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { cloudinaryUploadImage } from "utils/cloudinary";
import { trpc } from "utils/trpc";

const EditEventPage = () => {
  const router = useRouter();
  const eventId = router.query.eventId as string;

  const { mutateAsync: getCloudinarySecret } = trpc.useMutation([
    "author.cloudinaryUploadSignature",
  ]);
  const { mutateAsync: saveEvent } = trpc.useMutation(["events.updateEvent"]);

  const {
    data: event,
    isLoading: isLoadingEvent,
    refetch: refetchEvent,
  } = trpc.useQuery(["events.getEvent", { id: eventId }]);

  const { data: author, isLoading: isLoadingAuthor } = trpc.useQuery([
    "author.getAuthor",
  ]);

  const uploadImage = useCallback(
    (file: Blob) => {
      return cloudinaryUploadImage(file, () => getCloudinarySecret());
    },
    [getCloudinarySecret]
  );

  if (isLoadingEvent || isLoadingAuthor) {
    return <p>Loading .... </p>;
  }

  if (!event) {
    return "error";
  }

  return (
    <div className="">
      <div className="m-auto w-full">
        <EventForm
          uploadImage={uploadImage}
          initialValue={event}
          author={author!}
          back={() => router.push("..")}
          onSave={async (value) => {
            saveEvent({
              data: value,
              id: event.id,
            });
          }}
        />
      </div>
    </div>
  );
};

export default EditEventPage;
