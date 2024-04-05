import {
  Search,
  MoreHorizontal,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useState } from "react";

export function AttendeeList() {
  const [search, setSearch] = useState("");
  function onSearchINputChanged(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="flex items-center gap-3 px-3 w-72 py-1.5 border border-white/10 bg-transparent rounded-lg text-sm">
          <Search className="size-4 text-emerald-300" />
          <input
            onChange={onSearchINputChanged}
            className="bg-transparent flex-1 outline-none text-sm border-0 p-0"
            type="text"
            placeholder="Buscar Participantes"
          />
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border/10">
            <TableHeader
              style={{ width: 48 }}
              className="py-3 px-4 text-sm font-semibold text-left"
            >
              <input
                type="checkbox"
                className="size-4 bg-black/20 rounded border border-white/10"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data da Inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }).map((_, i) => {
            return (
              <TableRow
                key={i}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <TableCell>
                  <input
                    type="checkbox"
                    className="size-4 bg-black/20 rounded border border-white/10"
                  />
                </TableCell>
                <TableCell>123456</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-4">
                    <span className="font-bold text-white">Wener Rodrigo</span>
                    <span>wener@uol.com.br</span>
                  </div>
                </TableCell>
                <TableCell>7 dias atrás</TableCell>
                <TableCell>3 dis atrás</TableCell>
                <TableCell>
                  <IconButton transparent>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell
              className="py-3 px-4 text-sm font-semibold text-left"
              colSpan={3}
            >
              Mostrando 1 de 25 itens
            </TableCell>
            <td
              className="py-3 px-4 text-sm font-semibold text-right"
              colSpan={3}
            >
              <div className="inline-flex items-center gap-2">
                <span>Página 1 de 25</span>
                <div className="flex gap-1.5">
                  <IconButton>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                </div>
                <div>
                  <IconButton>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                </div>
                <div>
                  <IconButton>
                    <ChevronRight className="size-4" />
                  </IconButton>
                </div>
                <div>
                  <IconButton>
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
