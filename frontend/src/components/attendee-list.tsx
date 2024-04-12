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
import { ChangeEvent, useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface Attendee {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
}

export function AttendeeList() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());
    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") || "";
    }
    return "";
  });

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"));
    }
    return 1;
  });

  const totalPages = Math.ceil(total / 10);

  useEffect(() => {
    const url = new URL(
      "http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees"
    );

    url.searchParams.set("pageIndex", String(page - 1));
    if (search.length > 1) {
      url.searchParams.set("query", search);
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAttendees(data.attendees);
        setTotal(data.total);
      });
  }, [page, search]);

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());
    url.searchParams.set("search", search);
    window.history.pushState({}, "", url.toString());
    setSearch(search);
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());
    url.searchParams.set("page", String(page));
    window.history.pushState({}, "", url.toString());

    setPage(page);
  }

  function onSearchINputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value);
    setCurrentPage(1);
  }

  function nextPage() {
    setCurrentPage(page + 1);
  }

  function lastPage() {
    setCurrentPage(totalPages);
  }
  
  function previousPage() {
    setCurrentPage(page - 1);
  }


  function firstPage() {
    setCurrentPage(1);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="flex items-center gap-3 px-3 w-72 py-1.5 border border-white/10 bg-transparent rounded-lg text-sm">
          <Search className="size-4 text-emerald-300" />
          <input
            onChange={onSearchINputChanged}
            className="bg-transparent flex-1 outline-none text-sm border-0 p-0 focus:ring-0"
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
          {attendees.map((attendee) => {
            return (
              <TableRow
                key={attendee.id}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <TableCell>
                  <input
                    type="checkbox"
                    className="size-4 bg-black/20 rounded border border-white/10"
                  />
                </TableCell>
                <TableCell>{attendee.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-4">
                    <span className="font-bold text-white">
                      {attendee.name}
                    </span>
                    <span>{attendee.email}</span>
                  </div>
                </TableCell>
                <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                <TableCell>
                  {attendee.checkedInAt === null ? (
                    <span className="text-zinc-400">Não fez check-in</span>
                  ) : (
                    dayjs().to(attendee.checkedInAt)
                  )}
                </TableCell>
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
              Mostrando {attendees.length} de {total} itens
            </TableCell>
            <td
              className="py-3 px-4 text-sm font-semibold text-right"
              colSpan={3}
            >
              <div className="inline-flex items-center gap-2">
                <span>
                  Página {page} de {totalPages}
                </span>
                <div className="flex gap-1.5">
                  <IconButton onClick={firstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                </div>
                <div>
                  <IconButton onClick={previousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                </div>
                <div>
                  <IconButton onClick={nextPage} disabled={page === totalPages}>
                    <ChevronRight className="size-4" />
                  </IconButton>
                </div>
                <div>
                  <IconButton onClick={lastPage} disabled={page === totalPages}>
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
