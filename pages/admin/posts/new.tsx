import { PostForm } from "components/form/post-form";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { cloudinaryUploadImage } from "utils/cloudinary";
import { trpc } from "utils/trpc";

const NewPostPage = () => {
  const router = useRouter();

  const { mutateAsync: getCloudinarySecret } = trpc.useMutation([
    "author.cloudinaryUploadSignature",
  ]);
  const { mutateAsync: createPost } = trpc.useMutation(["author.createPost"]);

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
      <div className="w-full m-auto">
        <PostForm
          back={() => router.push(".")}
          uploadImage={uploadImage}
          author={author!}
          initialValue={{
            body: "",
            description: "",
            featuredImage: undefined,
            publishedTime: new Date(),
            showFeatureImage: true,
            tags: [],
            title: "",
          }}
          onSave={async (value) => {
            const res = await createPost({
              data: value,
            });
            router.push(`/admin/posts/${res.id}/edit`);
          }}
        />
      </div>
    </div>
  );
};

export default NewPostPage;
