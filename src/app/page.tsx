import Hero from "@/components/Hero";
import TheProblem from "@/components/TheProblem";
import TheTransformation from "@/components/TheTransformation";
import ThePerception from "@/components/ThePerception";
import TheSystem from "@/components/TheSystem";
import AboutMe from "@/components/AboutMe";
import PortfolioTeaser from "@/components/PortfolioTeaser";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <TheProblem />
      <TheTransformation />
      <ThePerception />
      <TheSystem />
      <AboutMe />
      <PortfolioTeaser />
      <Contact />
      <Footer />
    </main>
  );
}
