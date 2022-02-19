import { Author, Post } from "@prisma/client";
import { DatePickerField } from "components/form/date-picker";
import { PostPage } from "components/post";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { Field, Form, FormSpy } from "react-final-form";
import Modal from "react-modal";
import { readTime } from "utils/readTime";
import { trpc } from "utils/trpc";
import { zodValidate } from "utils/zod-validate";
import { z } from "zod";
import { FeatureImageField } from "./image-field";
import { SwitchField } from "./switch-field";

const EditorField = dynamic(() => import("components/form/editor"), {
  ssr: false,
});

export const PostFormSchema = z.object({
  title: z.string().max(100),
  description: z.string().max(500),
  body: z.string(),
  featuredImage: z.string(),
  publishedTime: z.date(),
  published: z.boolean(),
  showFeatureImage: z.boolean(),
  tags: z.string().array(),
});

type PostType = z.TypeOf<typeof PostFormSchema>;

export interface PostFormProps {
  post?: PostType;
  uploadImage: (file: Blob) => Promise<string>;
  onSave: (value: PostType) => Promise<void>;
}

export const PostForm = ({ post, uploadImage, onSave }: PostFormProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);

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
      initialValues={post}
      render={({ handleSubmit, invalid }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="h-16 bg-pink-600 flex items-center px-4 justify-between">
              <h2 className="text-2xl font-bold text-white px-2 align-middle">
                Post Editor
              </h2>
              <div>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={saving || invalid}
                >
                  {saving ? <span>...</span> : <span>Salva il Post</span>}
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setShowPreview((p) => !p)}
                >
                  Mosta Preview
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-3">
                {!showPreview && (
                  <div className="col-span-2">
                    <EditorField uploadImage={uploadImage} name="body" />
                  </div>
                )}
                <div className="space-y-8 divide-y divide-gray-200 px-4">
                  <div className="mt-4">
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
                                className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                {...input}
                              />
                            </div>
                            <div className="h-5 flex justify-between text-xs mt-1">
                              <span className="text-red-400 text-sm">
                                {meta.error}
                              </span>
                              <span className={"text-stone-400"}>
                                {input.value.length} / 100
                              </span>
                            </div>
                          </div>
                        );
                      }}
                    />

                    <div className="mt-6">
                      <SwitchField name="published" label="Pubblicato" />
                    </div>

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
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                              />
                            </div>
                            <div className="h-5 flex justify-between text-xs mt-1">
                              <span className="text-red-400 text-sm">
                                {meta.error}
                              </span>
                              <span className={"text-stone-400"}>
                                {input.value.length} / 500
                              </span>
                            </div>
                          </div>
                        )}
                      />
                    </div>
                    <div className="mt-6">
                      <FeatureImageField
                        uploadImage={uploadImage}
                        name="featuredImage"
                      />
                    </div>
                    <div className="mt-6">
                      <SwitchField
                        name="showFeatureImage"
                        label="Mostra Immagine"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Modal
                isOpen={showPreview}
                onRequestClose={() => setShowPreview(false)}
              >
                <FormSpy<PostType>
                  render={({ values }) => (
                    <div className="overflow-y-scroll   z-50 rounded-2xl">
                      <PostPreview post={values} />
                    </div>
                  )}
                ></FormSpy>
              </Modal>
            </div>
          </form>
        );
      }}
    />
  );
};

type PostData = Awaited<ReturnType<typeof getPostPreviewData>>;

const PostPreview = ({ post }: { post: PostType }) => {
  const { mutateAsync: mut } = trpc.useMutation(["md.serialize"]);

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

  return <PostPage frontmatter={frontmatter} source={mdxSource} />;
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
