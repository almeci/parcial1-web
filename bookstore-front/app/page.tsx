"use client";

import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <main className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-mauve-900 mb-4">
              Bienvenido a Bookstore
            </h1>
            <p className="text-xl text-mauve-600 max-w-2xl mx-auto">
              App realizada para el parcial 1 de programación con tecnologías
              web
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/authors"
              className="flex items-center gap-2 px-8 py-4 bg-mauve-600 text-mauve-100 font-semibold rounded-xl hover:bg-mauve-500"
            >
              Ver Autores
            </Link>
            <Link
              href="/crear"
              className="flex items-center gap-2 px-8 py-4 bg-mauve-300 text-mauve-600 font-semibold rounded-xl hover:bg-mauve-200"
            >
              Crear Autor
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
