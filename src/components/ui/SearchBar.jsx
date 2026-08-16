import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

export default function SearchBar({
  filters = {
    busca: "",
    cidade: "",
    faixa: "",
    especialidade: "",
  },
  onChange = () => {},
  onSearch = () => {},
}) {
  return (
    <div
      className="
        w-full
        rounded-2xl
        bg-white/10
        backdrop-blur-xl
        border
        border-white/10
        shadow-2xl
        p-2
      "
    >
      <div className="grid lg:grid-cols-5 gap-3">

        <div className="lg:col-span-2">
          <Input
            placeholder="Professor, academia ou cidade..."
            value={filters.busca}
            onChange={(e) =>
              onChange("busca", e.target.value)
            }
          />
        </div>

        <Select
          value={filters.cidade}
          onChange={(e) =>
            onChange("cidade", e.target.value)
          }
          placeholder="Cidade"
          options={[
            { value: "", label: "Cidade" },
            { value: "Curitiba", label: "Curitiba" },
            { value: "São Paulo", label: "São Paulo" },
            { value: "Rio de Janeiro", label: "Rio de Janeiro" },
          ]}
        />

        <Select
          value={filters.faixa}
          onChange={(e) =>
            onChange("faixa", e.target.value)
          }
          placeholder="Faixa"
          options={[
            { value: "", label: "Faixa" },
            { value: "Branca", label: "Branca" },
            { value: "Azul", label: "Azul" },
            { value: "Roxa", label: "Roxa" },
            { value: "Marrom", label: "Marrom" },
            { value: "Preta", label: "Preta" },
          ]}
        />

        <Select
          value={filters.especialidade}
          onChange={(e) =>
            onChange("especialidade", e.target.value)
          }
          placeholder="Especialidade"
          options={[
            { value: "", label: "Especialidade" },
            { value: "No-Gi", label: "No-Gi" },
            { value: "Kids", label: "Kids" },
            { value: "Competição", label: "Competição" },
          ]}
        />

      </div>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        className="mt-3"
        onClick={onSearch}
      >
        Encontrar Professor
      </Button>
    </div>
  );
}