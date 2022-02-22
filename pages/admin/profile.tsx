import { AdminLayout } from "components/admin/admin-layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const AdminPage = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <>
      <pre>{JSON.stringify(router, null, 2)}</pre>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
};

export default AdminPage;

AdminPage.Layout = AdminLayout;
