"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-mauve-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-mauve-100 text-xl font-bold hover:bg-mauve-500/50 px-2 py-1 rounded-xl">
                Bookstore
              </span>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl text-mauve-100 font-medium hover:bg-mauve-500/50"
            >
              Inicio
            </Link>
            <Link
              href="/authors"
              className="px-4 py-2 rounded-xl text-mauve-100 font-medium hover:bg-mauve-500/50"
            >
              Autores
            </Link>
            <Link
              href="/crear"
              className="px-4 py-2 rounded-xl text-mauve-100 font-medium hover:bg-mauve-500/50"
            >
              Crear Autor
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
