import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CTA from "../components/home/CTA";

import SearchPageHero from "../components/search/SearchPageHero";
import FilterSidebar from "../components/search/FilterSidebar";
import TeacherResults from "../components/search/TeacherResults";

export default function SearchTeachers() {
  return (
    <div className="bg-[#060816] min-h-screen text-white">

      <Navbar />

      <SearchPageHero />

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-12 gap-10">

          <aside className="lg:col-span-3">
            <FilterSidebar />
          </aside>

          <main className="lg:col-span-9">
            <TeacherResults />
          </main>

        </div>

      </section>

      <CTA />

      <Footer />

    </div>
  );
}