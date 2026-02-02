import type { ReactNode } from "react";

type FullScreenPageProps = {
  children: ReactNode;
  className?: string;
};

export const FullScreenPage = ({
  children,
  className,
}: FullScreenPageProps) => {
  const baseClassName = "flex flex-col h-screen bg-white px-6";
  const mergedClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  return <div className={mergedClassName}>{children}</div>;
};
