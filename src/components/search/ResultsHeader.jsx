import Select from "../ui/Select";

export default function ResultsHeader({ onSortChange }) {

  return (

    <Select
      placeholder="Ordenar por"
      onChange={onSortChange}
      options={[
        {
          value: "rating",
          label: "Melhor avaliação",
        },
        {
          value: "price_low",
          label: "Menor preço",
        },
        {
          value: "price_high",
          label: "Maior preço",
        },
      ]}
    />

  );

}