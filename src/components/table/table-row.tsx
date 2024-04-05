import { ComponentProps } from "react";

interface TableHeaderProps extends ComponentProps<"tr"> {}

export function TableRow(props: TableHeaderProps) {
  return (
    <tr className="border-b border-white/10 hover:bg-white/5" {...props} />
  );
}
