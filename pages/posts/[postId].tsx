import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import { db } from "services/db";

const MDEditor = dynamic(() => import("../../components/editor"));

const PostPage = ({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <MDEditor
        initialValue={post.body}
        previewStyle="vertical"
        height="600px"
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
  );
};

export default PostPage;

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext<{ postId: string }>) => {
  const id = params.postId!;
  const post = await db.post.findUnique({
    where: {
      id,
    },
  });
  return {
    props: { post },
  };
};
