"use client"; // porque usa hooks

import { useState, useEffect } from "react";
import { useAuthors, type Author } from "../context/AuthorsContext";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function AuthorsPage() {
  // Estado: guardar lista de autores

  const { authors, setAuthors, loaded, setLoaded } = useAuthors();

  const [submitted, setSubmitted] = useState(false);

  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null); // no hay nadie siendo editado inicialmente

  const [search, setSearch] = useState("");

  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = (e) => {
    e.preventDefault(); // evitar recarga
    setSubmitted(true);
    if (
      !editingAuthor?.name ||
      !editingAuthor?.description ||
      !editingAuthor?.birthDate ||
      !editingAuthor?.image
    )
      return; // validar campos
    setAuthors(
      authors.map(
        (a) => (a.id === editingAuthor.id ? editingAuthor : a), // reemplaza solo el autor editado
      ),
    );
    setEditingAuthor(null); // cerrar modal
    setSubmitted(false);
  };

  // Efecto: corre al cargar pagina

  useEffect(() => {
    if (loaded) return;
    fetch("http://127.0.0.1:8080/api/authors")
      .then((response) => response.json()) // convertir a json
      .then((data) => {
        setAuthors(data); // guardar en estado
        setLoaded(true);
      });
  }, [loaded, setAuthors, setLoaded]);

  const handleDelete = (id: number) => {
    setAuthors(authors.filter((author) => author.id !== id)); // eliminar autor por id
  };

  // Renderizar datos

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {editingAuthor && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-mauve-100 rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-mauve-900 mb-6">
              Editar Autor
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-mauve-700"
                >
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={editingAuthor?.name || ""}
                  onChange={(e) =>
                    setEditingAuthor(
                      editingAuthor
                        ? { ...editingAuthor, name: e.target.value }
                        : null,
                    )
                  }
                  placeholder="Ingrese el nombre del autor"
                  className="w-full rounded-xl bg-mauve-200 px-4 py-2.5 text-mauve-900 "
                  aria-required="true"
                  aria-invalid={submitted && !editingAuthor?.name}
                />
                {submitted && !editingAuthor?.name && (
                  <p className="text-rose-800 text-sm font-medium">
                    El nombre es obligatorio
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-mauve-700"
                >
                  Descripción
                </label>
                <input
                  id="description"
                  name="description"
                  value={editingAuthor?.description || ""}
                  onChange={(e) =>
                    setEditingAuthor(
                      editingAuthor
                        ? {
                            ...editingAuthor,
                            description: e.target.value,
                          }
                        : null,
                    )
                  }
                  placeholder="Ingrese la descripción del autor"
                  className="w-full rounded-xl bg-mauve-200 px-4 py-2.5 text-mauve-900 "
                  aria-required="true"
                  aria-invalid={submitted && !editingAuthor?.description}
                />
                {submitted && !editingAuthor?.description && (
                  <p className="text-rose-800 text-sm font-medium">
                    La descripción es obligatoria
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="birthDate"
                  className="block text-sm font-semibold text-mauve-700"
                >
                  Fecha de nacimiento
                </label>
                <input
                  id="birthDate"
                  name="birthDate"
                  type="text"
                  value={editingAuthor?.birthDate || ""}
                  onChange={(e) =>
                    setEditingAuthor(
                      editingAuthor
                        ? {
                            ...editingAuthor,
                            birthDate: e.target.value,
                          }
                        : null,
                    )
                  }
                  placeholder="Ingrese la fecha de nacimiento del autor"
                  className="w-full rounded-xl bg-mauve-200 px-4 py-2.5 text-mauve-900 "
                  aria-required="true"
                  aria-invalid={submitted && !editingAuthor?.birthDate}
                />
                {submitted && !editingAuthor?.birthDate && (
                  <p className="text-rose-800 text-sm font-medium">
                    La fecha de nacimiento es obligatoria
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="image"
                  className="block text-sm font-semibold text-mauve-700"
                >
                  Imagen
                </label>
                <input
                  id="image"
                  name="image"
                  type="text"
                  value={editingAuthor?.image || ""}
                  onChange={(e) =>
                    setEditingAuthor(
                      editingAuthor
                        ? {
                            ...editingAuthor,
                            image: e.target.value,
                          }
                        : null,
                    )
                  }
                  placeholder="Ingrese la URL de la imagen del autor"
                  className="w-full rounded-xl bg-mauve-200 px-4 py-2.5 text-mauve-900 "
                  aria-required="true"
                  aria-invalid={submitted && !editingAuthor?.image}
                />
                {submitted && !editingAuthor?.image && (
                  <p className="text-rose-800 text-sm font-medium">
                    La imagen es obligatoria
                  </p>
                )}
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingAuthor(null)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-mauve-300 text-mauve-700 font-medium hover:bg-mauve-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-mauve-600 text-mauve-100 font-medium hover:bg-mauve-500"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-mauve-900 mb-2">
            Lista de Autores
          </h1>
          <Link
            href="/crear"
            className="flex items-center gap-2 px-6 py-3 bg-mauve-600 text-mauve-100 font-semibold rounded-xl hover:bg-mauve-500"
          >
            Crear Nuevo Autor
          </Link>
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar autor..."
            className="w-full rounded-xl bg-mauve-200 px-4 py-2.5 text-mauve-900 "
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Si no hay autores, mostrar mensaje */}
          {filteredAuthors.length === 0 ? (
            <p className="text-mauve-600">
              No se encontró ningun autor con el nombre buscado
            </p>
          ) : (
            filteredAuthors.map((author) => (
              <div
                key={author.id}
                className="bg-mauve-100 rounded-4xl shadow-md overflow-hidden p-6"
              >
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={author.image}
                    alt={author.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-mauve-300"
                  />
                  <h3 className="text-xl flex-1 font-bold text-mauve-900">
                    {author.name}
                  </h3>
                  <button
                    onClick={() => setEditingAuthor(author)}
                    className="max-w-22 min-w-22 flex-1 flex items-center justify-center gap-2 py-2 bg-slate-500/80 text-mauve-100 font-medium rounded-xl hover:bg-slate-500/60"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(author.id)}
                    className="max-w-22 min-w-22 flex-1 flex items-center justify-center gap-2 py-2 bg-red-800/70 text-mauve-100 font-medium rounded-xl hover:bg-red-800/60"
                  >
                    Eliminar
                  </button>
                </div>
                <p className="text-mauve-600 text-sm mb-3">
                  {author.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-mauve-500">
                  {author.birthDate}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
