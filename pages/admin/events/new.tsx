import { EventForm } from "components/form/event-form";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { cloudinaryUploadImage } from "utils/cloudinary";
import { trpc } from "utils/trpc";

const NewEventPage = () => {
  const router = useRouter();

  const { mutateAsync: getCloudinarySecret } = trpc.useMutation([
    "author.cloudinaryUploadSignature",
  ]);
  const { mutateAsync: createEvent } = trpc.useMutation(["events.createEvent"]);

  const { data: author, isLoading: isLoadingAuthor } = trpc.useQuery([
    "author.getAuthor",
  ]);

  const uploadImage = useCallback(
    (file: Blob) => {
      return cloudinaryUploadImage(file, () => getCloudinarySecret());
    },
    [getCloudinarySecret]
  );

  if (isLoadingAuthor) {
    return <p>Loading .... </p>;
  }

  return (
    <div className="">
      <div className="m-auto w-full">
        <EventForm
          back={() => router.push(".")}
          uploadImage={uploadImage}
          author={author!}
          initialValue={{ tags: [] }}
          onSave={async (value) => {
            const res = await createEvent({
              data: value,
            });
            router.push(`/admin/events/${res.id}/edit`);
          }}
        />
      </div>
    </div>
  );
};

export default NewEventPage;
