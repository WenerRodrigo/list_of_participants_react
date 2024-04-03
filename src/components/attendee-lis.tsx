import { Search } from "lucide-react";

export function AttendeeList() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="flex items-center gap-3 px-3 w-72 py-1.5 border border-white/10 bg-transparent rounded-lg text-sm">
          <Search className="size-4 text-emerald-300" />
          <input
            className="bg-transparent flex-1 outline-none"
            type="text"
            placeholder="Buscar Participante"
          />
        </div>
      </div>

      <div className="border border-white/10 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border/10">
              <th className="py-3 px-4 text-sm font-semibold text-left">
                <input type="checkbox" />
              </th>
            </tr>
            <th className="py-3 px-4 text-sm font-semibold text-left">
              Código
            </th>
            <th className="py-3 px-4 text-sm font-semibold text-left">
              Participante
            </th>
            <th className="py-3 px-4 text-sm font-semibold text-left">
              Data da Inscrição
            </th>
            <th className="py-3 px-4 text-sm font-semibold text-left">
              Data do check-in
            </th>
            <th></th>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, i) => {
              return (
                <tr key={i} className="border-b border-white/10">
                  <td className="py-3 px-4 text-sm text-zinc-300">
                    <input type="checkbox" />
                  </td>
                  <td className="py-3 px-4 text-sm text-zinc-300">123456</td>
                  <td className="py-3 px-4 text-sm text-zinc-300">
                    <div className="flex flex-col gap-4">
                      <span className="font-bold text-white">
                        Wener Rodrigo
                      </span>
                      <span>wener@uol.com.br</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-zinc-300">
                    7 dias atrás
                  </td>
                  <td className="py-3 px-4 text-sm text-zinc-300">
                    3 dis atrás
                  </td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td
                className="py-3 px-4 text-sm font-semibold text-left"
                colSpan={3}
              >
                Mostrando 10 de 250 itens
              </td>
              <td
                className="py-3 px-4 text-sm font-semibold text-right"
                colSpan={3}
              >
                Página 1 de 25
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
