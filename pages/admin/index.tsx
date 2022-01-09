import { InferGetServerSidePropsType } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { db } from "services/db";

const AdminPage = ({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/admin/posts/${post.id}/edit`}>{post.title}</Link>
            </li>
          ))}
        </ul>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
  return (
    <>
      <h1>Ciao</h1>
    </>
  );
};

export default AdminPage;

export const getServerSideProps = async () => {
  const posts = await db.post.findMany({
    take: 10,
  });
  return { props: { posts } };
};
