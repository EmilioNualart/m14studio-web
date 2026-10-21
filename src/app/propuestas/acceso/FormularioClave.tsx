"use client";

import { useEffect, useState } from "react";
import { DESTINO_POR_DEFECTO } from "@/lib/acceso";

// La pantalla se sirve en la URL de la propuesta: de ahí sale a dónde volver.
export default function FormularioClave() {
  const [destino, setDestino] = useState(DESTINO_POR_DEFECTO);
  const [error, setError] = useState(false);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const { pathname, search } = window.location;
    if (!pathname.startsWith("/propuestas/acceso")) setDestino(pathname);
    setError(new URLSearchParams(search).has("error"));
  }, []);

  return (
    <form className="acceso-form" method="post" action="/propuestas/acceso/entrar" onSubmit={() => setEnviando(true)}>
      <input type="hidden" name="destino" value={destino} />
      <label className="placa" htmlFor="clave">Clave</label>
      <div className="acceso-fila">
        <input
          id="clave"
          name="clave"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          aria-invalid={error}
          aria-describedby={error ? "clave-error" : undefined}
        />
        <button type="submit" className="btn-papel" disabled={enviando}>
          <span className="placa">{enviando ? "Entrando" : "Entrar"}</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M4 10h12M11 5l5 5-5 5" />
          </svg>
        </button>
      </div>
      {error && <p id="clave-error" className="acceso-error" role="alert">Clave incorrecta. Inténtalo de nuevo.</p>}
    </form>
  );
}
