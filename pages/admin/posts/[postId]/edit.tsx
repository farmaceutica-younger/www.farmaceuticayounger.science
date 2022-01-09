import { trpc } from "utils/trpc";

import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import { db } from "services/db";

const MDEditor = dynamic(() => import("components/editor"));

const EditPostPage = ({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!post) {
    return null;
  }
  return (
    <div>
      <h1>{post.title}</h1>
      <div className="prose prose-2xl m-auto">
        <MDEditor
          initialValue={post.body}
          previewStyle="vertical"
          height="100vh"
          initialEditType="markdown"
          useCommandShortcut={true}
          hooks={{
            addImageBlobHook(blob, cb) {
              console.log(blob);
              cb("asd", "ciao");
            },
          }}
        />
      </div>
    </div>
  );
};

export default EditPostPage;

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext<{ postId: string }>) => {
  const id = params!.postId!;
  const post = await db.post.findUnique({
    where: {
      id,
    },
  });
  return {
    props: { post },
  };
};
