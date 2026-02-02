import { ReactNode } from "react";

type MySectionCardProps = {
  children: ReactNode;
  className?: string;
};

export const MySectionCard = ({ children, className }: MySectionCardProps) => {
  const baseClassName =
    "flex flex-col rounded-lg p-4 w-full h-fit items-center justify-center bg-white border border-main border-2 gap-y-3";

  const mergedClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  return <div className={mergedClassName}>{children}</div>;
};
