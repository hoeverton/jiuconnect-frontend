import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-700/30",

    secondary:
      "border border-purple-500 text-white hover:bg-purple-600/20",

    ghost:
      "text-white hover:text-purple-400",

    outline:
      "border border-white/20 text-white hover:border-purple-500 hover:bg-purple-600/10",
  };

  const sizes = {
    sm: "h-10 px-4 text-sm",

    md: "h-12 px-6 text-base",

    lg: "h-14 px-8 text-lg",
  };

  return (
    <button
      type={type}
      className={clsx(
        base,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}