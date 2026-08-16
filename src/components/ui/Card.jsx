import clsx from "clsx";

export default function Card({
  children,
  className = "",
  hover = true,
  ...props
}) {
  return (
    <div
      className={clsx(
        `
        rounded-2xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        shadow-lg
        transition-all
        duration-300
        `,
        hover &&
          `
          hover:-translate-y-1
          hover:border-purple-500/40
          hover:shadow-purple-700/20
          hover:shadow-xl
        `,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}