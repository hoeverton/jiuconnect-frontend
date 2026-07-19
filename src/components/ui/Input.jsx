import clsx from "clsx";

export default function Input({
  icon: Icon,
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

      <input
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
          placeholder:text-gray-500
          px-4
          transition-all
          duration-300
          outline-none

          focus:border-purple-500
          focus:ring-2
          focus:ring-purple-500/20

          hover:border-white/20
          `,
          Icon && "pl-12",
          className
        )}
        {...props}
      />

    </div>
  );
}