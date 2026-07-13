import type { Metadata } from "next";
import PortfolioContent from "./PortfolioContent";

export const metadata: Metadata = {
  title: "Portafolio — Growly",
  description:
    "Tres sitios diseñados para tres industrias distintas: Domulux, Rhino Construction y Delfos.",
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
