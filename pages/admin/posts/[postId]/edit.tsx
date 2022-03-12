import { PostForm } from "components/form/post-form";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { cloudinaryUploadImage } from "utils/cloudinary";
import { trpc } from "utils/trpc";

const EditPostPage = () => {
  const router = useRouter();
  const postId = router.query.postId as string;

  const { mutateAsync: getCloudinarySecret } = trpc.useMutation([
    "author.cloudinaryUploadSignature",
  ]);
  const { mutateAsync: savePost } = trpc.useMutation(["author.savePost"]);

  const {
    data: post,
    isLoading: isLoadingPost,
    refetch: refetchPost,
  } = trpc.useQuery(["author.getPost", { id: postId }]);

  const { data: author, isLoading: isLoadingAuthor } = trpc.useQuery([
    "author.getAuthor",
  ]);

  const uploadImage = useCallback(
    (file: Blob) => {
      return cloudinaryUploadImage(file, () => getCloudinarySecret());
    },
    [getCloudinarySecret]
  );

  if (isLoadingPost || isLoadingAuthor) {
    return <p>Loading .... </p>;
  }

  if (!post) {
    return "error";
  }

  return (
    <div className="">
      <div className="m-auto w-full">
        <PostForm
          uploadImage={uploadImage}
          initialValue={post}
          author={author!}
          back={() => router.push("..")}
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
