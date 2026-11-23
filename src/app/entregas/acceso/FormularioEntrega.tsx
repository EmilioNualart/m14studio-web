"use client";

import { useState, useSyncExternalStore } from "react";

const sinSuscripcion = () => () => {};

// La pantalla se sirve en la URL de la entrega: de ahí sale a dónde mandar la clave.
// En el prerender no hay URL, así que parte vacía y se completa al hidratar.
export default function FormularioEntrega() {
  const url = useSyncExternalStore(sinSuscripcion, () => window.location.pathname + window.location.search, () => "");
  const slug = url.match(/^\/entregas\/([a-z0-9-]+)\/?(?:\?|$)/)?.[1];
  const accion = slug ? `/entregas/${slug}/entrar` : "";
  const error = /[?&]error=/.test(url);
  const [enviando, setEnviando] = useState(false);

  return (
    <form className="acceso-form" method="post" action={accion} onSubmit={() => setEnviando(true)}>
      <label className="placa" htmlFor="clave">Clave</label>
      <div className="acceso-fila">
        <input
          id="clave"
          name="clave"
          type="text"
          inputMode="text"
          autoCapitalize="characters"
          autoComplete="off"
          spellCheck={false}
          placeholder="XXXX-XXXX"
          required
          autoFocus
          aria-invalid={error}
          aria-describedby={error ? "clave-error" : undefined}
        />
        <button type="submit" className="btn-papel" disabled={enviando || !accion}>
          <span className="placa">{enviando ? "Entrando" : "Entrar"}</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M4 10h12M11 5l5 5-5 5" />
          </svg>
        </button>
      </div>
      {error && <p id="clave-error" className="acceso-error" role="alert">Clave incorrecta. Revísala e inténtalo de nuevo.</p>}
    </form>
  );
}
