import { AdminLayout } from "components/admin/admin-layout";
import { PostsList } from "components/admin/posts-list";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { db } from "services/db";
import { trpc } from "utils/trpc";

const AdminPostsPage = () => {
  const { data: posts, refetch: refetchPosts } = trpc.useQuery([
    "author.getPosts",
  ]);
  const { mutateAsync: publishPostMut } = trpc.useMutation([
    "author.publishPost",
  ]);

  const publishPost = async (postID: string) => {
    await publishPostMut({ id: postID });
    await refetchPosts();
  };

  if (!posts) {
    return <p>loading...</p>;
  }

  return (
    <AdminLayout>
      <PostsList posts={posts} publish={publishPost} />
    </AdminLayout>
  );
};

export default AdminPostsPage;
