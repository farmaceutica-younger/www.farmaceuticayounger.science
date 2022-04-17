import { Author } from "@prisma/client";
import { DatePickerField } from "components/form/date-picker";
import { PostPage } from "components/post";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { readTime } from "utils/readTime";
import { trpc } from "utils/trpc";
import { zodValidate } from "utils/zod-validate";
import { z } from "zod";
import { FeatureImageField } from "./image-field";
import { SwitchField } from "./switch-field";
import styled from "@emotion/styled";
import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

const EditorField = dynamic(() => import("components/form/editor"), {
  ssr: false,
});

export const PostFormSchema = z.object({
  title: z.string().max(100),
  description: z.string().max(500),
  body: z.string(),
  featuredImage: z.string(),
  publishedTime: z.date(),
  showFeatureImage: z.boolean(),
  tags: z.string().array(),
});

type PostType = z.TypeOf<typeof PostFormSchema>;

export interface PostFormProps {
  initialValue: Partial<PostType>;
  uploadImage: (file: Blob) => Promise<string>;
  onSave: (value: PostType) => Promise<void>;
  back: () => void;
  author: Author;
}

export const PostForm = ({
  initialValue,
  uploadImage,
  onSave,
  author,
  back,
}: PostFormProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [_initialValue] = useState({
    publishedTime: new Date(),
    tags: [],
    ...initialValue,
  });

  const openPreview = () => setShowPreview(true);

  const onSubmit = useCallback(
    async (value: PostType) => {
      setSaving(true);
      try {
        await onSave(value);
      } catch {}
      setSaving(false);
    },
    [onSave]
  );

  return (
    <Form<PostType>
      onSubmit={onSubmit}
      validate={zodValidate(PostFormSchema)}
      initialValues={_initialValue}
      render={({ handleSubmit, invalid }) => {
        return (
          <PostFormStyled onSubmit={handleSubmit}>
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
              <PostFormFiels uploadImage={uploadImage} />
            </div>
            <Dialog
              open={showPreview}
              onClose={() => setShowPreview(false)}
              className="fixed inset-0 z-50 overflow-y-auto "
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

              <div className="fixed inset-10 overflow-auto rounded bg-white shadow-xl ring-1">
                <FormSpy<PostType>
                  render={({ values }) => (
                    <div className="overflow-y-scroll rounded-2xl">
                      <PostPreview post={values} author={author} />
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
          </PostFormStyled>
        );
      }}
    />
  );
};

const PostFormStyled = styled.form`
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

type PostData = Awaited<ReturnType<typeof getPostPreviewData>>;

const PostPreview = ({ post, author }: { post: PostType; author: Author }) => {
  const { mutateAsync: mut } = trpc.useMutation(["author.mdSerialize"]);

  const [data, setData] = useState<PostData | undefined>();
  useEffect(() => {
    const serialize = async (body: string) => {
      const { source } = await mut({ body });
      return source;
    };
    getPostPreviewData(post, serialize).then(setData);
  }, [post, mut]);

  if (!data) {
    return <p>loading....</p>;
  }

  const { frontmatter, mdxSource } = data;

  return (
    <PostPage frontmatter={frontmatter} source={mdxSource} author={author} />
  );
};

const getPostPreviewData = async (
  post: PostType,
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
          Post Editor
        </h2>
      </div>
      <div>
        <button
          type="submit"
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={saving || invalid}
        >
          {saving ? <span>...</span> : <span>Salva il Post</span>}
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

interface PostFormFielsProps {
  uploadImage: (file: Blob) => Promise<string>;
}

const PostFormFiels = ({ uploadImage }: PostFormFielsProps) => {
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
                  Titolo del Post
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
              Data di Pubblicazione
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <DatePickerField name="publishedTime" />
            </div>
          </div>
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
        <div className="mt-6">
          <SwitchField name="showFeatureImage" label="Mostra Immagine" />
        </div>
      </div>
    </div>
  );
};
