import { Event } from "@prisma/client";
import { Footer } from "components/footer";
import { Header } from "components/header";
import { getLinkedinOAUTHUrl } from "config/linkedin";
import { GetServerSidePropsContext } from "next";
import { db } from "services/db";

const RegisterPage = ({
  frontmatter,
  linkedinUrl,
}: Awaited<ReturnType<typeof getProps>>["props"]) => {
  if (!frontmatter) {
    return null;
  }
  return (
    <>
      <Header />
      <div className="prose m-auto mt-10 max-w-md px-2">
        <h2>Registrati all&apos;evento {frontmatter.title}</h2>
        <p>
          Segui questi 4 semplici step per ottenere il tuo personalissimo Ticket
          di accesso all&apos;evento:
        </p>
        <ol>
          <li>
            Clicca sul bottone{" "}
            <strong>&quot;Ottieni il Ticket con Linkedin!&quot;</strong>
          </li>
          <li>
            Accedi al tuo profilo di <strong>Linkedin</strong>
          </li>
          <li>
            Ti verrà generato in automatico il tuo <strong>Ticket</strong> per
            accedere all&apos;evento
          </li>
          <li>
            <strong>Condividi</strong> il ticket con la tua rete di Contatti per
            far sapere a tutti che partecipera all&apos;evento
          </li>
        </ol>
        <div className="flex">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary m-auto"
          >
            Ottieni il Ticket con Linkedin
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext<{ slug: string }>) {
  const slug = params?.slug!;
  const event = await db.event.findFirst({
    where: {
      slug: slug,
    },
    include: {
      author: true,
    },
  });
  if (!event) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return getProps(event);
}

const getProps = async (event: Event) => {
  const { body, ...frontmatter } = event;
  return {
    props: {
      frontmatter,
      linkedinUrl: getLinkedinOAUTHUrl(event.id),
    },
  };
};
