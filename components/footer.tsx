import {
  faFacebookSquare,
  faInstagram,
  faLinkedin,
  faYoutube,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Icon {
  color: string;
  link: string;
  icon: IconDefinition;
}

const icons: Icon[] = [
  {
    icon: faFacebookSquare,
    color: "#3b5999",
    link: "https://www.facebook.com/FarmaceuticaYounger/",
  },
  {
    icon: faInstagram,
    color: "#e4405f",
    link: "https://www.instagram.com/farmaceutica_younger/",
  },
  {
    icon: faLinkedin,
    color: "#0077B5",
    link: "https://www.linkedin.com/company/farmaceutica-younger",
  },
  {
    icon: faYoutube,
    color: "#cd201f",
    link: "https://www.youtube.com/channel/UCBzcNd6Z480lWkchyanC4_A",
  },
];

export const Footer = () => {
  return (
    <div>
      {/* <Newsletter /> */}
      <footer className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl space-y-8 overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-xl text-gray-600">
            <p>
              <span className="font-bold">Farmaceutica Younger</span> by Silvia
              Vernotico
            </p>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-6">
            {icons.map((icon, idx) => (
              <a key={idx} href={icon.link} target="_blank" rel="noreferrer">
                <FontAwesomeIcon
                  className="h-8 w-8"
                  icon={icon.icon}
                  style={{ color: icon.color }}
                />
              </a>
            ))}
          </div>
          <p className="mt-8 text-center text-base leading-6 text-gray-400">
            Copyright &copy; 2017 - {new Date().getFullYear()}
          </p>

          <div className="mt-8 text-center text-sm text-gray-400">
            <a
              href="https://www.iubenda.com/privacy-policy/86855038"
              target="_blank"
              className="mx-2 hover:text-gray-600"
              rel="noreferrer"
            >
              Privacy Policy
            </a>
            <a
              href="https://www.iubenda.com/privacy-policy/86855038/cookie-policy"
              target="_blank"
              className="mx-2 hover:text-gray-600"
              rel="noreferrer"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
