"use client"; // porque usa hooks

import { useState } from "react";
import { useAuthors } from "../context/AuthorsContext";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function CreateAuthors() {
  const router = useRouter();
  // Formulario controlado: cada field tiene su propio estado

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [image, setImage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { authors, setAuthors } = useAuthors();

  const isValid = name && description && birthDate && image; // validar campos

  const handleSubmit = (e) => {
    e.preventDefault(); // evitar recarga
    setSubmitted(true);
    if (!isValid) return;
    const newAuthor = { id: Date.now(), name, description, birthDate, image };
    setAuthors([...authors, newAuthor]);
    // Resetear formulario
    setName("");
    setDescription("");
    setBirthDate("");
    setImage("");
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-mauve-100 rounded-4xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-mauve-900 mb-2">
              Crear nuevo autor
            </h1>
            <p className="text-mauve-600">
              Recuerda que el autor creado se persistirá mientras que no
              recargues la aplicación (de acuerdo con el scope del parcial,
              enfocándonos en persistir esta información mediante Context)
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingresa el nombre del autor"
                className="w-full rounded-xl bg-mauve-200 px-4 py-3 text-mauve-900 "
                aria-required="true"
                aria-invalid={submitted && !name}
              />
              {submitted && !name && (
                <p className="text-rose-800 text-sm font-medium flex items-center gap-1">
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ingresa la descripción del autor"
                className="w-full rounded-xl bg-mauve-200 px-4 py-3 text-mauve-900 "
                aria-required="true"
                aria-invalid={submitted && !description}
              />
              {submitted && !description && (
                <p className="text-rose-800 text-sm font-medium flex items-center gap-1">
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
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                placeholder="Ingresa la fecha de nacimiento del autor"
                className="w-full rounded-xl bg-mauve-200 px-4 py-3 text-mauve-900 "
                aria-required="true"
                aria-invalid={submitted && !birthDate}
              />
              {submitted && !birthDate && (
                <p className="text-rose-800 text-sm font-medium flex items-center gap-1">
                  La fecha de nacimiento es obligatoria
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="image"
                className="block text-sm font-semibold text-mauve-700"
              >
                URL de la imagen
              </label>
              <input
                id="image"
                name="image"
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Ingresa la URL de la imagen del autor"
                className="w-full rounded-xl bg-mauve-200 px-4 py-3 text-mauve-900 "
                aria-required="true"
                aria-invalid={submitted && !image}
              />
              {submitted && !image && (
                <p className="text-rose-800 text-sm font-medium flex items-center gap-1">
                  La imagen es obligatoria
                </p>
              )}
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-mauve-600 text-mauve-100 font-semibold rounded-xl hover:bg-mauve-500"
              >
                Guardar Autor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
