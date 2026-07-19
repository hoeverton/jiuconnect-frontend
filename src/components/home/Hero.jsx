import hero from "../../assets/images/hero.png";
import { Search, MapPin, Medal, Dumbbell } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";


export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816]">

      <img
        src={hero}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/80 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto min-h-screen flex items-center px-8 pt-24">

        <div className="max-w-3xl">

          <h1 className="text-7xl font-black leading-tight">

            Encontre o

            <br />

            professor ideal

            <br />

            para

            <span className="text-purple-500">
              {" "}evoluir no tatame.
            </span>

          </h1>

          <p className="mt-8 text-xl text-gray-300">
            Conecte-se aos melhores professores de Jiu-Jitsu do Brasil.
          </p>

          {/* Barra de Busca */}

          <div className="mt-8 w-full max-w-2xl backdrop-blur-xl bg-white/10 border border-white/10 rounded-xl p-2 shadow-xl">

            <div className="grid lg:grid-cols-5 gap-3">

              <div className="relative lg:col-span-2">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                <Input
                    icon={Search}
                    placeholder="Professor, academia ou cidade..."
                />
              </div>

              <div className="relative">
               
                <Select
                 
                  placeholder="Cidade"
                  options={[
                    { value: "curitiba", label: "Curitiba" },
                    { value: "sp", label: "São Paulo" },
                    { value: "rio", label: "Rio de Janeiro" },
                  ]}
                />
              </div>

              <div className="relative">
                

                <Select
                  
                  placeholder="Faixa"
                  options={[
                    { value: "preta", label: "Preta" },
                    { value: "marrom", label: "Marrom" },
                    { value: "roxa", label: "Roxa" },
                    { value: "azul", label: "Azul" },
                    { value: "branca", label: "Branca" },
                    
                    
                    
                    
                  ]}
                />
              </div>

              <div className="relative">
                

               <Select
                  
                  placeholder="Especialidade"
                  options={[
                    { value: "nogi", label: "No-Gi" },
                    { value: "kids", label: "Kids" },
                    { value: "competicao", label: "Competição" },
                  ]}
                />
              </div>

            </div>

            <Button
                variant="primary"
                size="lg"
                fullWidth
                className="mt-3"
              >
                Encontrar Professor
            </Button>

          </div>

        </div>

      </div>

    </section>
  );
}