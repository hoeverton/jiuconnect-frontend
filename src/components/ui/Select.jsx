import clsx from "clsx";
import { ChevronDown } from "lucide-react";

export default function Select({
  icon: Icon,
  options = [],
  placeholder = "Selecione",
  className = "",
  ...props
}) {
  return (
    <div className="relative w-full">

      {Icon && (
        <Icon
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            w-5
            h-5
            text-gray-400
            pointer-events-none
          "
        />
      )}

      <select
        className={clsx(
          `
          w-full
          h-12
          rounded-xl
          bg-white/5
          border
          border-white/10
          backdrop-blur-xl
          text-white
          appearance-none
          transition-all
          duration-300
          outline-none
          pr-12
          px-4

          focus:border-purple-500
          focus:ring-2
          focus:ring-purple-500/20

          hover:border-white/20
          `,
          Icon && "pl-12",
          className
        )}
        {...props}
      >
        <option value="" className="bg-[#111827] text-gray-400">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-[#111827] text-white"
          >
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          w-5
          h-5
          text-gray-400
          pointer-events-none
        "
      />

    </div>
  );
}