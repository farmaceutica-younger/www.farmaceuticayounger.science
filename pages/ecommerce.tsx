import { Layout } from "components/layout";
import React from "react";

interface Book {
  title: string;
  price: number;
  buy: string;
  textPrice: string;
  note?: string;
}

const ebookEmailText =
  "Voglio acquistare il libro in formato cartaceo a 19.99€ + 7.00€ di spese di spedizione (o 8.99€ se spedizione su Sicilia o Sardegna)!";

const BookSection = () => {
  const books: Book[] = [
    {
      title: "Ebook",
      textPrice: "9.99€",
      price: 9.99,
      buy: "mailto:silvia@farmaceuticayounger.science?subject=[Acquisto ebook cGMP]&body=Voglio acquistare il libro in formato digitale a 9.99€",
    },
    {
      title: "Cartaceo",
      textPrice: "19.99€ + spedizione",
      price: 19.99,
      note: "escluse spese di spedizione",
      buy: `mailto:silvia@farmaceuticayounger.science?subject=[Acquisto libro cGMP]&body=Voglio acquistare il libro in formato cartaceo a 19.99€ + 7.00€ di spese di spedizione (o 8.99€ se spedizione su Sicilia o Sardegna)!`,
    },
  ];

  return (
    <div className="relative bg-white overflow-hidden">
      <main className="mt-4 mx-auto max-w-screen-xl px-4 sm:mt-6 sm:px-6 md:mt-10 xl:mt-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <p className="mt-3 text-base text-gray-500 leading-snug sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Il{" "}
              <span className="text-pink-600 font-semibold italic">
                GMP Pocket book
              </span>{" "}
              è una traduzione delle Good Manufacturing Practice Volume 4, Parte
              I che tratta dei Requisiti base che deve avere un prodotto
              medicinale per essere fabbricato.
            </p>
            <p className="mt-3 text-base text-gray-500 leading-snug sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Fondamentali per mettere in piedi un sistema di qualità che
              garantisca che il farmaco sia di qualità, sicuro ed efficace. Il
              GMP Pocket book ti permetterà di comprendere le fondamenta di
              un’azienda farmaceutica attraverso le normative che la regolano.
            </p>{" "}
            <p className="mt-3 text-base text-gray-500 leading-snug sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Lo trovi in due versioni, quella elettronica che ti permetterà di
              riceverlo istantaneamente e la versione cartacea, dove potrai
              ammirare anche la grafica curata dall’illustratrice nonché CTFina{" "}
              <a
                className="underline text-pink-600 hover:text-pink-900"
                href="https://instagram.com/silfraen?igshid=6c23ibmkflvm"
                target="_blank"
                rel="noreferrer"
              >
                Francesca Silvestri
              </a>
              .
            </p>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full rounded-lg overflow-hidden focus:outline-none focus:shadow-outline">
                <img
                  className="w-full"
                  src="https://res.cloudinary.com/dbdvy5b2z/image/upload/c_scale,w_600/v1646563513/fy/ecommerce/gmpbook_uxszzd.jpg"
                  alt="GMP Pocket Book"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="mx-auto flex justify-center lg:justify-start max-w-screen-xl px-4 sm:px-6 mt-8 space-x-2 mb-10">
        {books.map((book, idx) => (
          <div key={idx}>
            <a
              className="text-white
              flex
              px-4 py-2 bg-pink-500 rounded
              text-lg hover:bg-pink-800 divide-white"
              href={book.buy}
              rel="noreferrer"
            >
              <span className="mr-2">{book.title}</span>
              <span>{book.textPrice}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const Mug = () => {
  const mugs = [
    {
      title:
        "Vorrei acquistare la Magic Mug a 25.99€ incluse spese di spedizione",
      price: 25.99,
      buy: "mailto:silvia@farmaceuticayounger.science?subject=[Acquisto Magic Mug]&body=Voglio acquistare la magic mug a 25.99€ incluse spese di spedizione",
    },
  ];
  return (
    <div className="relative bg-white overflow-hidden">
      <h2 className="mt-1 text-center text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:leading-none">
        Magic <span className="text-pink-600">Mug</span>
      </h2>
      <main className="mt-8 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-20 xl:mt-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              La Magic Mug di Farmaceutica Younger ti terrà compagnia durante le
              fredde serate invernali con le citazioni più frizzanti di tre
              grandi donne della scienza e con una splendida veste grafica
              realizzata per te dalla illustratrice{" "}
              <a
                className="underline hover:text-gray-900"
                href="https://instagram.com/silfraen?igshid=6c23ibmkflvm"
                target="_blank"
                rel="noreferrer"
              >
                CTFina Francesca Silvestri.
              </a>
              :
              <ul>
                <li>Ada Yonath - “Sii appassionatamente curioso”</li>
                <li>
                  Rita Levi Montalcini - “Meglio aggiungere vita ai giorni che
                  giorni alla vita”
                </li>
                <li>
                  Marie Curie - “Sii meno curioso della gente e più curioso
                  delle idee”
                </li>
              </ul>
              La tazza rivelerà la tua citazione preferita non appena avrai
              versato del liquido caldo nella magic mug. Potrai anche
              personalizzare la tua mug con il tuo nome!
            </p>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full rounded-lg overflow-hidden focus:outline-none focus:shadow-outline">
                <img
                  className="w-full"
                  src="/ecommerce/mug.jpeg"
                  alt="Woman making a sale"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6">
        {mugs.map((mug, idx) => (
          <div key={idx}>
            <a
              className="text-pink-600 text-lg hover:text-pink-800 underline"
              href={mug.buy}
              rel="noreferrer"
            >
              {" "}
              {mug.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const Mascherine = () => {
  const masks = [
    {
      title:
        "Vorrei acquistare il pack da 3 mascherine a 15.99€ escluse spese di spedizione",
      price: 15.99,
      buy: "mailto:silvia@farmaceuticayounger.science?subject=[Acquisto Pack Mascherine]&body=Voglio acquistare il pack da 3 mascherine a 15.99€ escluse spese di spedizione",
    },
  ];
  return (
    <div className="relative bg-white overflow-hidden">
      <h2 className="mt-1 text-center text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:leading-none">
        Pack <span className="text-pink-600">Mascherine</span>
      </h2>
      <main className="mt-8 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-20 xl:mt-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full rounded-lg overflow-hidden focus:outline-none focus:shadow-outline">
                <img
                  className="w-full"
                  src="/ecommerce/mask1.jpeg"
                  alt="Maskerine"
                />
              </div>
            </div>
          </div>

          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Prenota la tua mascherina preferita e porta sempre con te le
              citazioni degli scienziati internazionali scelte per te da
              Farmaceutica Younger. Potrai comporre il tuo personalissimo pack
              con 3 mascherine a scelta tra le cinque disponibili:
              <ul>
                <li>
                  “La fortuna favorisce le menti preparate” LOUIS PASTEUR - NERA
                </li>
                <li>
                  “Se comprendere è impossibile, conoscere è necessario” PRIMO
                  LEVI - AZZURRA
                </li>
                <li>
                  “Senza dati sei solo un’altra persona con un’opinione”
                  W.EDWARDS DEMING - BIANCO
                </li>
                <li>
                  “Meglio aggiungere vita ai giorni che giorni alla vita” RITA
                  LEVI-MONTALCINI - LILLA
                </li>
                <li>
                  “Sii meno curioso della gente e più curioso delle idee” MARIE
                  CURIE - FUCSIA
                </li>
              </ul>
            </p>
          </div>
        </div>
      </main>

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6">
        {masks.map((mask, idx) => (
          <div key={idx}>
            <a
              className="text-pink-600 text-lg hover:text-pink-800 underline"
              href={mask.buy}
              rel="noreferrer"
            >
              {" "}
              {mask.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const EcommercePage = () => {
  return (
    <Layout>
      {/* <SEO title="Farmaceutica Younger" /> */}
      <div className="text-center sm:mt-20 p-2">
        <h2 className="text-pink-600 text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-6xl sm:leading-10">
          GMP Pocket Book
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-8">
          I soldi raccolti dalle vendite serviranno a supportare Farmaceutica
          Younger nei suoi eventi!
        </p>
      </div>

      <div className="mt-2">
        <BookSection />
      </div>
    </Layout>
  );
};

export default EcommercePage;
