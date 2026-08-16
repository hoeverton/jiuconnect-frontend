import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CTA from "../components/home/CTA";

import ProfessorProfile from "../components/professor/ProfessorProfile";

export default function ProfessorDetalhe() {

  return (

    <div className="bg-[#060816] min-h-screen text-white">

      <Navbar />

      <ProfessorProfile />

      <CTA />

      <Footer />

    </div>

  );

}