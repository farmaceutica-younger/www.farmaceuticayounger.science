import { Event, PrismaClient } from "@prisma/client";
import { linkedinConfig } from "config/linkedin";
import { GetServerSidePropsContext } from "next";

export default function Login() {
  return (
    <div>
      <h3>logged</h3>
    </div>
  );
}
const prisma = new PrismaClient();

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const code = ctx.query.code as string;
  const eventId = ctx.query.state as string;
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) {
    return {
      notFound: true,
    };
  }
  const ticket = await getOrCreateTicket(code, event);
  return {
    redirect: {
      destination: `/events/${event.slug}/tickets/${ticket.id}`,
      permanent: false,
    },
  };
}

async function getOrCreateTicket(code: string, event: Event) {
  const accessToken = await getAccessToken(code);
  const profile = await getUserProfile(accessToken);
  const email = await getUserEmail(accessToken);
  const total = await prisma.eventTicket.count({
    where: { eventId: event.id },
  });
  const name = `${profile.firstName} ${profile.lastName}`.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    ""
  );

  const ticket = await prisma.eventTicket.upsert({
    create: {
      avatar: profile.profileImageURL,
      email: email,
      name: name,
      role: "",
      ticketNum: total + 1,
      eventId: event.id,
    },
    update: {
      avatar: profile.profileImageURL,
      name: name,
    },
    where: {
      email: email,
    },
  });
  return ticket;
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

async function getUserProfile(accessToken: string) {
  const urlToGetUserProfile =
    "https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedSummary,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))";

  const res = await fetch(urlToGetUserProfile, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((r) => r.json());
  const id = res.id as string;
  const firstName = res.localizedFirstName as string;
  const lastName = res.localizedLastName as string;
  const profileImageURL = res["profilePicture"]["displayImage~"]?.elements[0]
    .identifiers[0].identifier as string;

  return { firstName, lastName, profileImageURL, id };
}

async function getUserEmail(accessToken: string) {
  const urlToGetUserEmail =
    "https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))";

  const res = await fetch(urlToGetUserEmail, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((r) => r.json());

  return res.elements[0]["handle~"].emailAddress as string;
}

const qs = (params: { [k: string]: string }) => {
  let res = "";
  for (let k in params) {
    res = res + `&${k}=${params[k]}`;
  }
  return res;
};
