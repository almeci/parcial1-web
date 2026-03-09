"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Author {
  id: number;
  name: string;
  description: string;
  birthDate: string;
  image: string;
}

interface AuthorsContextType {
  authors: Author[];
  setAuthors: (authors: Author[]) => void;
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
}

const AuthorsContext = createContext<AuthorsContextType | null>(null); // contenedor global vacio

export function AuthorsProvider({ children }: { children: ReactNode }) {
  // componente que envuelve la app y da acceso a todos sus hijos
  const [authors, setAuthors] = useState<Author[]>([]); // caja vacia
  const [loaded, setLoaded] = useState(false);

  return (
    <AuthorsContext.Provider value={{ authors, setAuthors, loaded, setLoaded }}>
      {children} {/* todo lo que envuelva tiene acceso */}
    </AuthorsContext.Provider>
  );
}

export function useAuthors() {
  const context = useContext(AuthorsContext); // acceder a la caja desde cualquier lado
  if (!context) {
    throw new Error("useAuthors must be used within an AuthorsProvider");
  }
  return context;
}

export type { Author };
