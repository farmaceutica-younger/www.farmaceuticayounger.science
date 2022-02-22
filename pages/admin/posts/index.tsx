import { AdminLayout } from "components/admin/admin-layout";
import { PostsList } from "components/admin/posts-list";
import { trpc } from "utils/trpc";

const AdminPostsPage = () => {
  const { data, refetch: refetchPosts } = trpc.useQuery([
    "author.getPosts",
    { skip: 0, take: 20 },
  ]);
  const { mutateAsync: publishPostMut } = trpc.useMutation([
    "author.publishPost",
  ]);

  const publishPost = async (postID: string) => {
    await publishPostMut({ id: postID });
    await refetchPosts();
  };

  if (!data) {
    return <p>loading...</p>;
  }
  const { posts } = data;

  return <PostsList posts={posts} publish={publishPost} />;
};

export default AdminPostsPage;

AdminPostsPage.Layout = AdminLayout;
