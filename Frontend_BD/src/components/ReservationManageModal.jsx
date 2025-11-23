import { useEffect, useState, useMemo } from "react";
import { apiFetch } from "../utils/api";
import { toast } from "react-toastify";

export default function ReservationManageModal({
                                                   open,
                                                   onClose,
                                                   reserva,
                                                   token,
                                                   onUpdated,
                                               }) {
    if (!open || !reserva) return null;

    const base = reserva.detalle_full ?? reserva;

    const [participantes, setParticipantes] = useState([]);

    useEffect(() => {
        const lista =
            (base && Array.isArray(base.participantes) && base.participantes) || [];
        const normalizados = lista.map((p) => ({
            ci: p.ci,
            nombre: p.nombre,
            apellido: p.apellido,
            estado_confirmacion: p.estado_confirmacion || p.confirmacion,
            asistencia: p.asistencia || "Asiste",
        }));
        setParticipantes(normalizados);
    }, [base]);

    function updateLocal(ci, patch) {
        setParticipantes((prev) =>
            prev.map((p) => (p.ci === ci ? { ...p, ...patch } : p))
        );
    }

    async function handleAsistenciaChange(ci, nuevaAsistencia) {
        try {
            await apiFetch(
                `/reservas/participante/${base.id_reserva}/${ci}/asistencia`,
                {
                    method: "PATCH",
                    token,
                    body: { asistencia: nuevaAsistencia },
                }
            );
            updateLocal(ci, { asistencia: nuevaAsistencia });
            toast.success("Asistencia actualizada");
            onUpdated && onUpdated();
        } catch (e) {
            console.error(e);
            toast.error("Error al actualizar asistencia");
        }
    }

    async function handleEliminar(ci) {
        if (
            !window.confirm(
                "¿Seguro que deseas eliminar a este participante de la reserva?"
            )
        ) {
            return;
        }
        try {
            await apiFetch(`/reservas/participante/${base.id_reserva}/${ci}`, {
                method: "DELETE",
                token,
            });
            setParticipantes((prev) => prev.filter((p) => p.ci !== ci));
            toast.success("Participante eliminado");
            onUpdated && onUpdated();
        } catch (e) {
            console.error(e);
            toast.error("Error al eliminar participante");
        }
    }

    const confirmados = useMemo(
        () => participantes.filter((p) => p.estado_confirmacion === "Confirmado"),
        [participantes]
    );

    const todosNoAsisten = useMemo(
        () =>
            confirmados.length > 0 &&
            confirmados.every(
                (p) => (p.asistencia || "").toLowerCase() === "no asiste"
            ),
        [confirmados]
    );

    async function handleSinAsistencia() {
        if (
            !window.confirm(
                "Esto marcará la reserva como 'Sin asistencia' y aplicará sanciones a los confirmados que no asistieron. ¿Continuar?"
            )
        ) {
            return;
        }
        try {
            await apiFetch(`/reservas/sin-asistencia/${base.id_reserva}`, {
                method: "POST",
                token,
            });
            toast.success("Reserva marcada como 'Sin asistencia' y sanciones aplicadas");
            onUpdated && onUpdated();
            onClose && onClose();
        } catch (e) {
            console.error(e);
            toast.error("Error al marcar como 'Sin asistencia'");
        }
    }

    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
            <div className="w-full max-w-3xl rounded-2xl bg-white p-4 shadow-xl">
                {/* Header */}
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">
                        Gestionar reserva
                    </h3>
                    <button
                        onClick={onClose}
                        className="rounded-xl border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
                    >
                        Cerrar
                    </button>
                </div>

                <div className="mb-4 grid gap-1 text-sm text-slate-800">
                    <div>
                        <span className="text-slate-600">Sala:</span> {base.sala || base.nombre_sala}
                    </div>
                    <div>
                        <span className="text-slate-600">Edificio:</span> {base.edificio}
                    </div>
                    <div>
                        <span className="text-slate-600">Fecha:</span> {base.fecha}
                    </div>
                    <div>
                        <span className="text-slate-600">Turno:</span>{" "}
                        {base.turno || `${base.hora_inicio} · ${base.hora_fin}`}
                    </div>
                    <div>
                        <span className="text-slate-600">Estado:</span> {base.estado}
                    </div>
                </div>

                <h4 className="text-sm font-semibold text-slate-900 mb-2">
                    Participantes
                </h4>
                <div className="max-h-[50vh] overflow-auto rounded-xl border border-slate-200">
                    {participantes.length === 0 ? (
                        <div className="p-3 text-sm text-slate-600">
                            No hay participantes registrados en esta reserva.
                        </div>
                    ) : (
                        <table className="min-w-full text-sm">
                            <thead className="bg-slate-50 text-slate-700">
                            <tr>
                                <th className="px-3 py-2 text-left font-medium">Participante</th>
                                <th className="px-3 py-2 text-left font-medium">Confirmación</th>
                                <th className="px-3 py-2 text-left font-medium">Asistencia</th>
                                <th className="px-3 py-2 text-right font-medium">Acciones</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                            {participantes.map((p) => (
                                <tr key={p.ci}>
                                    <td className="px-3 py-2">
                                        <div className="font-medium text-slate-900">
                                            {p.nombre} {p.apellido}
                                        </div>
                                        <div className="text-xs text-slate-500">CI {p.ci}</div>
                                    </td>
                                    <td className="px-3 py-2">
                      <span
                          className={[
                              "inline-flex rounded-full px-2 py-0.5 text-xs font-semibold",
                              p.estado_confirmacion === "Confirmado"
                                  ? "bg-green-100 text-green-700"
                                  : p.estado_confirmacion === "Rechazado"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-yellow-100 text-yellow-700",
                          ].join(" ")}
                      >
                        {p.estado_confirmacion}
                      </span>
                                    </td>
                                    <td className="px-3 py-2">
                                        <select
                                            value={p.asistencia || "Asiste"}
                                            onChange={(e) =>
                                                handleAsistenciaChange(p.ci, e.target.value)
                                            }
                                            className="rounded-lg border border-slate-300 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="Asiste">Asiste</option>
                                            <option value="No asiste">No asiste</option>
                                        </select>
                                    </td>
                                    <td className="px-3 py-2 text-right">
                                        <button
                                            onClick={() => handleEliminar(p.ci)}
                                            className="inline-flex items-center rounded-xl border border-red-200 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-50"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {todosNoAsisten && (
                    <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-3">
                        <p className="text-sm text-amber-800 mb-2">
                            Todos los participantes <strong>confirmados</strong> están marcados
                            como <strong>"No asiste"</strong>.
                        </p>
                        <button
                            onClick={handleSinAsistencia}
                            className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                        >
                            Marcar reserva como "Sin asistencia" y aplicar sanciones
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
