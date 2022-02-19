import { PostForm } from "components/form/post-form";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useCallback } from "react";
import { db } from "services/db";
import { cloudinaryUploadImage } from "utils/cloudinary";
import { trpc } from "utils/trpc";

const EditPostPage = ({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { mutateAsync: getCloudinarySecret } = trpc.useMutation([
    "cloudinary.getUploadsignature",
  ]);
  const { mutateAsync: savePost } = trpc.useMutation(["post.save"]);

  const uploadImage = useCallback(
    (file: Blob) => {
      return cloudinaryUploadImage(file, () => getCloudinarySecret());
    },
    [getCloudinarySecret]
  );

  if (!post) {
    return null;
  }

  return (
    <div className="">
      <div className="w-full m-auto">
        <PostForm
          uploadImage={uploadImage}
          post={post}
          onSave={async (value) => {
            savePost({
              data: value,
              id: post.id,
            });
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
    include: {
      author: true,
    },
  });
  return {
    props: { post },
  };
};
