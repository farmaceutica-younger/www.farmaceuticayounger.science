import styled from "@emotion/styled";
import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Author } from "@prisma/client";
import { EventPage } from "components/event";
import { DatePickerField } from "components/form/date-picker";
import deepEqual from "fast-deep-equal";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { readTime } from "utils/readTime";
import { trpc } from "utils/trpc";
import { zodValidate } from "utils/zod-validate";
import { z } from "zod";
import { FeatureImageField } from "./image-field";

const EditorField = dynamic(() => import("components/form/editor"), {
  ssr: false,
});

export const EventFormSchema = z.object({
  title: z.string().max(100),
  description: z.string().max(500),
  body: z.string(),
  featuredImage: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  tags: z.string().array(),
  location: z.string().max(200),
});

type EventType = z.TypeOf<typeof EventFormSchema>;

export interface EventFormProps {
  initialValue: Partial<EventType>;
  uploadImage: (file: Blob) => Promise<string>;
  onSave: (value: EventType) => Promise<void>;
  back: () => void;
  author: Author;
}

export const EventForm = ({
  uploadImage,
  onSave,
  author,
  back,
  initialValue,
}: EventFormProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  const openPreview = () => setShowPreview(true);

  const onSubmit = useCallback(
    async (value: EventType) => {
      setSaving(true);
      try {
        await onSave(value);
      } catch {}
      setSaving(false);
    },
    [onSave]
  );

  return (
    <Form<EventType>
      onSubmit={onSubmit}
      validate={zodValidate(EventFormSchema)}
      initialValues={initialValue}
      initialValuesEqual={deepEqual}
      render={({ handleSubmit, invalid, values }) => {
        return (
          <EventFormStyled onSubmit={handleSubmit}>
            <div className="nav">
              <FormNav
                invalid={invalid}
                saving={saving}
                openPreview={openPreview}
                back={back}
              />
            </div>
            <div className="editor z-10">
              <EditorField uploadImage={uploadImage} name="body" />
            </div>
            <div className="fields">
              <EventFormFiels uploadImage={uploadImage} />
            </div>
            <Dialog
              open={showPreview}
              onClose={() => setShowPreview(false)}
              className="fixed inset-0 z-50 overflow-y-auto "
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

              <div className="fixed inset-10 overflow-auto rounded bg-white shadow-xl ring-1">
                <FormSpy<EventType>
                  render={({ values }) => (
                    <div className="overflow-y-scroll rounded-2xl">
                      <EventPreview post={values} author={author} />
                    </div>
                  )}
                ></FormSpy>
                <button
                  onClick={() => setShowPreview(false)}
                  className="absolute top-4 right-4 grid h-10 w-10 place-content-center rounded-full hover:bg-slate-200"
                >
                  <XIcon className="h-6 w-6" />
                </button>
              </div>
            </Dialog>
          </EventFormStyled>
        );
      }}
    />
  );
};

const EventFormStyled = styled.form`
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-columns: 2fr minmax(300px, 1fr);
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    "nav    nav"
    "editor fields";

  .editor {
    grid-area: editor;
  }
  .nav {
    grid-area: nav;
  }
  .fields {
    grid-area: fields;
    overflow-y: scroll;
    padding: 1rem 1rem;
  }
`;

type EventData = Awaited<ReturnType<typeof getEventPreviewData>>;

const EventPreview = ({
  post,
  author,
}: {
  post: EventType;
  author: Author;
}) => {
  const { mutateAsync: mut } = trpc.useMutation(["author.mdSerialize"]);

  const [data, setData] = useState<EventData | undefined>();
  useEffect(() => {
    const serialize = async (body: string) => {
      const { source } = await mut({ body });
      return source;
    };
    getEventPreviewData(post, serialize).then(setData);
  }, [post, mut]);

  if (!data) {
    return <p>loading....</p>;
  }

  const { frontmatter, mdxSource } = data;

  return (
    <EventPage frontmatter={frontmatter} source={mdxSource} author={author} />
  );
};

const getEventPreviewData = async (
  post: EventType,
  serialize: (
    body: string
  ) => Promise<MDXRemoteSerializeResult<Record<string, unknown>>>
) => {
  const { body, ...frontmatter } = post;

  const mdxSource = await serialize(body);

  return {
    mdxSource,
    frontmatter: {
      ...frontmatter,
      readTime: readTime(body),
    },
  };
};

interface FormNavProps {
  saving: boolean;
  invalid: boolean;
  openPreview: () => void;
  back: () => void;
}
const FormNav = ({ invalid, openPreview, saving, back }: FormNavProps) => {
  return (
    <div className="flex h-16 items-center justify-between bg-pink-600 px-4">
      <div className="flex">
        <button onClick={back} className="text-white">
          Indietro
        </button>
        <h2 className="px-2 align-middle text-2xl font-bold text-white">
          Event Editor
        </h2>
      </div>
      <div>
        <button
          type="submit"
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={saving || invalid}
        >
          {saving ? <span>...</span> : <span>Salva l&apos;Evento</span>}
        </button>
        <button
          type="submit"
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={openPreview}
        >
          Mosta Preview
        </button>
      </div>
    </div>
  );
};

interface EventFormFielsProps {
  uploadImage: (file: Blob) => Promise<string>;
}

const EventFormFiels = ({ uploadImage }: EventFormFielsProps) => {
  return (
    <div className="space-y-8 divide-y divide-gray-200">
      <div>
        <Field
          type="text"
          name="title"
          id="title"
          autoComplete="title"
          render={({ input, meta }) => {
            return (
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Titolo del Event
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    {...input}
                  />
                </div>
                <div className="mt-1 flex h-5 justify-between text-xs">
                  <span className="text-sm text-red-400">{meta.error}</span>
                  <span className={"text-stone-400"}>
                    {input.value.length} / 100
                  </span>
                </div>
              </div>
            );
          }}
        />

        <div className="mt-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Inizio dell&apos;evento
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <DatePickerField name="startDate" />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Fine dell&apos;evento
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <DatePickerField name="endDate" />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Field
            id="location"
            name="location"
            type="text"
            render={({ input, meta }) => (
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Luogo dell&apos;evento
                </label>
                <div className="mt-1">
                  <input
                    {...input}
                    className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mt-1 flex h-5 justify-between text-xs">
                  <span className="text-sm text-red-400">{meta.error}</span>
                  <span className={"text-stone-400"}>
                    {input.value.length} / 200
                  </span>
                </div>
              </div>
            )}
          />
        </div>

        <div className="mt-6">
          <Field
            id="description"
            name="description"
            type="text"
            render={({ input, meta }) => (
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descrizione
                </label>
                <div className="mt-1">
                  <textarea
                    {...input}
                    rows={10}
                    className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mt-1 flex h-5 justify-between text-xs">
                  <span className="text-sm text-red-400">{meta.error}</span>
                  <span className={"text-stone-400"}>
                    {input.value.length} / 500
                  </span>
                </div>
              </div>
            )}
          />
        </div>
        <div className="mt-6">
          <FeatureImageField uploadImage={uploadImage} name="featuredImage" />
        </div>
      </div>
    </div>
  );
};
