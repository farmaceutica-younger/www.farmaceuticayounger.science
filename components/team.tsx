import Image from "next/image";

export const Team: React.FC<{}> = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
            <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-pink-600 sm:text-4xl">
              La Crew
            </h2>
            <p className="text-xl leading-7 text-gray-500">
              Chatta, entra in contatto o prenota il tuo personalissimo incontro
              con il team di Farmaceutica Younger fatto di esperti del mondo
              farmaceutico.
              <span className="ml-2 text-pink-400">
                Ti basta cliccare sulle due icone in basso!
              </span>
            </p>
          </div>
          <ul className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:max-w-5xl lg:grid-cols-3">
            {crew.map((member) => (
              <li key={member.name}>
                <div className="space-y-6">
                  <Image
                    className="mx-auto h-40 w-40 rounded-full xl:h-56 xl:w-56"
                    alt={member.name}
                    width={300}
                    src={member.image}
                    height={300}
                  />
                  <div className="space-y-2">
                    <div className="space-y-1 text-lg font-medium leading-6">
                      <h4>{member.name}</h4>
                      <p className="text-pink-600">{member.position}</p>
                    </div>
                    <ul className="flex justify-center space-x-5">
                      {member.one2one && (
                        <li>
                          <a
                            href={member.one2one}
                            target="_blank"
                            className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-500"
                            rel="noreferrer"
                          >
                            <span className="sr-only">Calendly</span>
                            <svg
                              className="h-8 w-8 text-pink-500 hover:text-pink-800"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        </li>
                      )}
                      <li>
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-500"
                            rel="noreferrer"
                          >
                            <span className="sr-only">LinkedIn</span>
                            <svg
                              className="h-8 w-8 text-blue-500 hover:text-blue-800"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const crew = [
  {
    name: "Giorgia Bottello",
    position: "Quality Control",
    description:
      "Si laurea in CTF presso l'Università degli studi di Milano nel 2006. Inizia il suo percorso professionale in Bayer nel Quality Assurance per poi proseguire come analista del controllo qualità in Nova Argentia e come documentation specialist in Bidachem. Attualmente ricopre il ruolo di QA Specialist presso Guna S.p.a",
    linkedin: "https://www.linkedin.com/in/giorgia-bottello-44772660",
    one2one: "https://calendly.com/giorgia-bottello/15min",
    image: "/fy/authors/giorgia_ixtzta.jpg",
  },
  {
    name: "Giulia Giori",
    position: "Quality Control",
    description:
      "Si laurea in CTF presso l'Università degli studi di Ferrara nel 2016. Inizia il suo percorso nel mondo farmaceutico come analista del controllo qualità in Roche per poi proseguire il suo percorso in Guna S.p.a dove attualmente si occupa di studi di stabilità.",
    linkedin: "https://www.linkedin.com/in/giulia-giori-623251118",
    one2one:
      "https://calendly.com/giulia-giori/one2one-con-giulia-di-farmaceutica-younger?fbclid=IwAR0dnuN13dQRe0jBCaxI-L-xWRZ8zdjiY9rrUr0QfmAZQ-jeUfI4MD0_gbg&month=2020-06",
    image: "/v1641520587/fy/authors/giugi_dfxqoq.jpg",
  },
  {
    name: "Maurizio Cuocolo",
    position: "Quality Assurance - Studi Clinici",
    description:
      "Si laurea in CTF presso l'Università dagli Studi di Perugia nel 2014 e inizia a lavorare prima nel QA di Pfizer e Teva per poi approdare nel regolatorio. Attualmente ricopre il ruolo di Regulatory Affairs Specialist in Cambrex.",
    linkedin: "https://www.linkedin.com/in/maurizio-cuocolo-4685a126/",
    one2one: "https://calendly.com/maurizio-cuocolo/maurizio-cuocolo",
    image: "/v1641589898/fy/authors/maurizio_avi6ll.jpg",
  },
  {
    name: "Sara Bigiotti",
    position: "Quality Assurance",
    description:
      "Si laurea in CTF presso l'Università degli Studi di Pavia nel 2014 e da allora ha ricoperto il ruolo di Quality Assurance Specialist in Baxter, Medtronic e attualmente in S.I.I.T. srl.",
    linkedin: "https://www.linkedin.com/in/sara-bigiotti-54097396/",
    one2one: "https://calendly.com/sara_fy/30min",
    image: "/v1641589898/fy/authors/sara_bj6hw9.jpg",
  },
  {
    name: "Valentina Riccio",
    position: "Regulatory Affairs",
    description:
      "Si laurea in CTF presso l'Università degli Studi di Roma \\La Sapienza\\ nel 2013 e da allora ha ricoperto il ruolo di Regulatory Affairs Specialist in Ibsa Bayer Boehringer Ingelheim e Guna  S.p.a.",
    linkedin: "https://www.linkedin.com/in/valentina-riccio-8634b188",
    one2one:
      "https://calendly.com/riccio_valentina/one2one-con-valentina-riccio-di-farmaceutica-younger-2",
    image: "/v1641589898/fy/authors/valentina_acw9iv.jpg",
  },
  {
    name: "Irene Carnovale",
    position: "Scientist R&D",
    description:
      "All'Università degli Studi di Torino consegue la laurea in CTF (2014) e il dottorato di ricerca in Scienze Farmaceutiche e Biomolecolari  svolto in collaborazione con Bracco Imaging S.p.a. (2019). Poco prima della discussione di dottorato inizia la sua esperienza di Scientist R&D in Inghilterra presso Selcia Ltd. (Eurofins Group), dedicandosi alla sintesi di prodotti farmaceutici radiomarcati per studi preclinici. Attualmente ricopre il ruolo di Chemist R&D nella divisione Isotope Chemistry di Accelera S.r.l. (Nerviano Medical Science Group).",
    image: "/v1641520587/fy/authors/irenecarnovale_cdet9r.jpg",
    linkedin: "https://www.linkedin.com/in/irene-maria-carnovale-9900a7160/",
    one2one: "https://calendly.com/irene-carnovale/30min",
  },
  {
    name: "Silvia Garau",
    position: "Marketing",
    description:
      "Ciao, sono Silvia! Ho 25 anni e mi sono laureata in CTF a marzo 2020. Durante la pandemia ho iniziato a raccontare per FY le storie di donne che mi ispirano e incuriosiscono ogni giorno. Da sempre curiosa e chiacchierona, amo la birra e la montagna.",
    image: "/v1641520587/fy/authors/silviagarau_a3wsvs.jpg",
    linkedin: "https://www.linkedin.com/in/silvia-garau/",
    one2one: "https://calendly.com/silvia_garau/30min",
  },
];
