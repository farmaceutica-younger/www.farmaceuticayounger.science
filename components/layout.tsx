import { FC } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

export const Layout: FC = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
