"use client";

import { createContext, useContext, useState } from "react";

const AuthorsContext = createContext(null); // contenedor global vacio

export function AuthorsProvider({ children }) {
  // componente que envuelve la app y da acceso a todos sus hijos
  const [authors, setAuthors] = useState([]); // caja vacia
  const [loaded, setLoaded] = useState(false);

  return (
    <AuthorsContext.Provider value={{ authors, setAuthors, loaded, setLoaded }}>
      {children} {/* todo lo que envuelva tiene acceso */}
    </AuthorsContext.Provider>
  );
}

export function useAuthors() {
  return useContext(AuthorsContext); // acceder a la caja desde cualquier lado
}
