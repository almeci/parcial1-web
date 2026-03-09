"use client"; // porque usa hooks

import { useState, useEffect } from "react";
import { useAuthors } from "../context/AuthorsContext";
import { useRouter } from "next/navigation";

export default function AuthorsPage() {
  const router = useRouter();
  // Estado: guardar lista de autores

  const { authors, setAuthors, loaded, setLoaded } = useAuthors();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [image, setImage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [editingAuthor, setEditingAuthor] = useState(null); // no hay nadie siendo editado inicialmente

  const handleSubmit = (e) => {
    e.preventDefault(); // evitar recarga
    setSubmitted(true);
    if (
      !editingAuthor.name ||
      !editingAuthor.description ||
      !editingAuthor.birthDate ||
      !editingAuthor.image
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

  const handleDelete = (id) => {
    setAuthors(authors.filter((author) => author.id !== id)); // eliminar autor por id
  };

  // Renderizar datos

  return (
    <div>
      {editingAuthor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-zinc-800 rounded-2xl p-6 w-96">
            <h2>Editar Autor</h2>
            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={editingAuthor.name}
                  onChange={(e) =>
                    setEditingAuthor({ ...editingAuthor, name: e.target.value })
                  }
                  placeholder="Ingrese el nombre del autor"
                  className="w-full rounded-xl border border-slate-500"
                  aria-required="true"
                  aria-invalid={submitted && !editingAuthor.name}
                />
                {submitted && !editingAuthor.name && (
                  <p className="text-red-500 text-sm">
                    El nombre es obligatorio
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium"
                >
                  Descripción
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={editingAuthor.description}
                  onChange={(e) =>
                    setEditingAuthor({
                      ...editingAuthor,
                      description: e.target.value,
                    })
                  }
                  placeholder="Ingrese la descripción del autor"
                  className="w-full rounded-xl border border-slate-500"
                  aria-required="true"
                  aria-invalid={submitted && !editingAuthor.description}
                />
                {submitted && !editingAuthor.description && (
                  <p className="text-red-500 text-sm">
                    La descripción es obligatoria
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="birthDate"
                  className="block text-sm font-medium"
                >
                  Fecha de nacimiento
                </label>
                <input
                  id="birthDate"
                  name="birthDate"
                  type="text"
                  value={editingAuthor.birthDate}
                  onChange={(e) =>
                    setEditingAuthor({
                      ...editingAuthor,
                      birthDate: e.target.value,
                    })
                  }
                  placeholder="Ingrese la fecha de nacimiento del autor"
                  className="w-full rounded-xl border border-slate-500"
                  aria-required="true"
                  aria-invalid={submitted && !editingAuthor.birthDate}
                />
                {submitted && !editingAuthor.birthDate && (
                  <p className="text-red-500 text-sm">
                    La fecha de nacimiento es obligatoria
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="image" className="block text-sm font-medium">
                  Imagen
                </label>
                <input
                  id="image"
                  name="image"
                  type="text"
                  value={editingAuthor.image}
                  onChange={(e) =>
                    setEditingAuthor({
                      ...editingAuthor,
                      image: e.target.value,
                    })
                  }
                  placeholder="Ingrese la URL de la imagen del autor"
                  className="w-full rounded-xl border border-slate-500"
                  aria-required="true"
                  aria-invalid={submitted && !editingAuthor.image}
                />
                {submitted && !editingAuthor.image && (
                  <p className="text-red-500 text-sm">
                    La imagen es obligatoria
                  </p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  // disabled={!isValid}
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 hover:bg-blue-800 disabled:bg-gray-500 disabled:text-gray-400"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div>
        <h1>Lista de autores</h1>
        {authors.map(
          (
            author, // recorrer lista de autores
          ) => (
            <div key={author.id}>
              <p>{author.name}</p>
              <button
                className="inline-flex items-center justify-center rounded-lg bg-yellow-600 px-4 hover:bg-yellow-700"
                onClick={() => setEditingAuthor(author)}
              >
                Editar
              </button>
              <button
                className="inline-flex items-center justify-center rounded-lg bg-red-500 px-4 hover:bg-red-700"
                onClick={() => handleDelete(author.id)}
              >
                Eliminar
              </button>
            </div>
          ),
        )}
        <button
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 hover:bg-blue-800"
          onClick={() => router.push("/crear")}
        >
          Crear nuevo autor
        </button>
      </div>
    </div>
  );
}
