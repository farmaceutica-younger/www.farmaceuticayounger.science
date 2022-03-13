import { BlogIcon } from "components/icon";
import { InferGetServerSidePropsType } from "next";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SVGProps } from "react";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function SignIn({ providers }: Props) {
  const session = useSession();
  const router = useRouter();
  if (session.status === "authenticated") {
    const url = (router.query.callbackUrl as string) || "/admin";
    router.push(url);
    return <p>loading</p>;
  }
  if (!providers) {
    return "error";
  }
  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <BlogIcon className="mx-auto h-14 w-auto text-pink-600" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="mt-0">
              <div className="mt-2 grid grid-cols-1 gap-3">
                <div>
                  <button
                    onClick={() => signIn(providers.google.id)}
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <GoogleIcon className="h-5 w-5" fill="currentColor" />
                    <span className="ml-3">Login con Google </span>
                    <span className="sr-only">Sign in with Facebook</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function xxx({ providers }: Props) {
  if (!providers) {
    return "error";
  }
  return (
    <>
      <pre>{JSON.stringify(providers, null, 2)}</pre>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

const GoogleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    aria-hidden="true"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Google</title>
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
  </svg>
);
