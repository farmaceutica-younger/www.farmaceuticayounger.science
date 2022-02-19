import { AdminLayout } from "components/admin/admin-layout";
import { PostsList } from "components/admin/posts-list";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { db } from "services/db";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const AdminPostsPage = ({ posts }: Props) => {
  return (
    <AdminLayout>
      <PostsList posts={posts} />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/admin/posts/${post.id}/edit`}>
              <a className=""> {post.title} </a>
            </Link>
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};

export default AdminPostsPage;

export const getServerSideProps = async () => {
  const posts = await db.post.findMany({});
  return {
    props: { posts },
  };
};
