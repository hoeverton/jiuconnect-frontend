import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import CTA from "../components/home/CTA";

import SearchPageHero from "../components/search/SearchPageHero";
import ProfessorResults from "../components/search/ProfessorResults";

export default function SearchTeachers() {
  return (
    <div className="bg-[#060816] min-h-screen text-white">

      <Navbar />

      <main className="pt-24">

        <SearchPageHero />

        <section className="max-w-7xl mx-auto px-6 py-20">

          <ProfessorResults />

        </section>

      </main>

      <CTA />

      <Footer />

    </div>
  );
}