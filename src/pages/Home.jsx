import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";
import Categories from "../components/home/Categories";
import Testimonials from "../components/home/Testimonials";
import Stats from "../components/home/Stats";
import CTA from "../components/home/CTA";

import ProfessorResults from "../components/search/ProfessorResults";

export default function Home() {
  return (
    <div className="bg-[#060816] text-white">

      <Navbar />

      <Hero />

      <ProfessorResults />

      <HowItWorks />

      <Categories />

      <Testimonials />

      <Stats />

      <CTA />

      <Footer />

    </div>
  );
}