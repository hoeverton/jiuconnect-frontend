import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import SearchHero from "../components/search/SearchHero";
import SearchBar from "../components/search/SearchBar";
import FilterSidebar from "../components/search/FilterSidebar";
import TeacherResults from "../components/search/TeacherResults";
import Pagination from "../components/search/Pagination";
import CTA from "../components/home/CTA";

export default function SearchTeachers() {
  return (
    <div className="bg-[#060816] min-h-screen text-white">

      <Navbar />

      <SearchHero />

      <section className="max-w-7xl mx-auto px-6 py-10">

        <SearchBar />

        <div className="grid grid-cols-12 gap-8 mt-8">

          <aside className="col-span-3">
            <FilterSidebar />
          </aside>

          <main className="col-span-9">
            <TeacherResults />
            <Pagination />
          </main>

        </div>

      </section>

      <CTA />

      <Footer />

    </div>
  );
}