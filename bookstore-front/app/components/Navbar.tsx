"use client";

import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-mauve-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => router.push("/")}
              className="flex items-center space-x-2"
            >
              <span className="text-mauve-100 text-xl font-bold hover:bg-mauve-500/50 px-2 py-1 rounded-xl">
                Bookstore
              </span>
            </button>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 rounded-xl text-mauve-100 font-medium hover:bg-mauve-500/50"
            >
              Inicio
            </button>
            <button
              onClick={() => router.push("/authors")}
              className="px-4 py-2 rounded-xl text-mauve-100 font-medium hover:bg-mauve-500/50"
            >
              Autores
            </button>
            <button
              onClick={() => router.push("/crear")}
              className="px-4 py-2 rounded-xl text-mauve-100 font-medium hover:bg-mauve-500/50"
            >
              Crear Autor
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
