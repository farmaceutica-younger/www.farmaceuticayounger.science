import { Event, PrismaClient } from "@prisma/client";
import { Header } from "components/header";
import { QuestionairreForm } from "components/questionairre/form";
import { linkedinConfig } from "config/linkedin";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { db } from "services/db";
import { getUserEmail, getUserProfile } from "utils/linkedin";
import { trpc } from "utils/trpc";

export default function Login({
  accessToken,
  email,
  profile,
  event,
}: Awaited<ReturnType<typeof prepareData>>["props"]) {
  const { mutateAsync: createTicket } = trpc.useMutation(
    "tickets.createTicket"
  );
  const router = useRouter();

  return (
    <>
      <Header />
      <div className="prose m-auto mt-10 max-w-md px-2">
        <div>
          <h2> Complimenti, è quasi tutto pronto! </h2>
          <div>
            <p>Email: {email}</p>
            <p>
              Name: {profile.firstName} {profile.lastName}
            </p>
          </div>
          <p> Un ultimo step ti separa dal tuo ingresso all&apos;evento!</p>
          <p> Compila il form qui in basso!</p>
          <div>
            <QuestionairreForm
              questionairre={event.questionairre as any}
              title={event.title}
              onSumbit={async (value) => {
                const ticket = await createTicket({
                  eventId: event.id,
                  linkedinToken: accessToken,
                  form: value,
                });
                await router.push(
                  `/events/${event.slug}/tickets/${ticket.id}/success?token=${ticket.token}`
                );
              }}
              submitText="Ottieni il ticket"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const code = ctx.query.code as string;
  const eventId = ctx.query.state as string;
  const event = await db.event.findUnique({ where: { id: eventId } });
  if (!event) {
    return {
      notFound: true,
    };
  }
  return prepareData(code, event);
}

async function prepareData(code: string, event: Event) {
  const accessToken = await getAccessToken(code);
  const profile = await getUserProfile(accessToken);
  const email = await getUserEmail(accessToken);
  return {
    props: {
      accessToken,
      profile,
      email,
      event,
    },
  };
}

async function getAccessToken(code: string) {
  const query = qs({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: linkedinConfig.callbackURL,
    client_id: linkedinConfig.clientID,
    client_secret: linkedinConfig.clientSecret,
  });

  const urlToGetLinkedInAccessToken =
    "https://www.linkedin.com/oauth/v2/accessToken";
  const res = await fetch(urlToGetLinkedInAccessToken + `?${query}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((r) => r.json());
  return res.access_token as string;
}

const qs = (params: { [k: string]: string }) => {
  let res = "";
  for (let k in params) {
    res = res + `&${k}=${params[k]}`;
  }
  return res;
};
