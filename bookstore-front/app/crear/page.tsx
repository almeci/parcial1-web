"use client"; // porque usa hooks

import { useState } from "react";
import { useAuthors } from "../context/AuthorsContext";
import { useRouter } from "next/navigation";

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
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingrese el nombre del autor"
            className="w-full rounded-xl border border-slate-500"
            aria-required="true"
            aria-invalid={submitted && !name}
          />
          {submitted && !name && (
            <p className="text-red-500 text-sm">El nombre es obligatorio</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium">
            Descripción
          </label>
          <input
            id="description"
            name="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ingrese la descripción del autor"
            className="w-full rounded-xl border border-slate-500"
            aria-required="true"
            aria-invalid={submitted && !name}
          />
          {submitted && !description && (
            <p className="text-red-500 text-sm">
              La descripción es obligatoria
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="birthDate" className="block text-sm font-medium">
            Fecha de nacimiento
          </label>
          <input
            id="birthDate"
            name="birthDate"
            type="text"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder="Ingrese la fecha de nacimiento del autor"
            className="w-full rounded-xl border border-slate-500"
            aria-required="true"
            aria-invalid={submitted && !name}
          />
          {submitted && !birthDate && (
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
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Ingrese la URL de la imagen del autor"
            className="w-full rounded-xl border border-slate-500"
            aria-required="true"
            aria-invalid={submitted && !name}
          />
          {submitted && !image && (
            <p className="text-red-500 text-sm">La imagen es obligatoria</p>
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
      <button
        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 hover:bg-blue-800"
        onClick={() => router.push("/authors")}
      >
        Volver a la lista
      </button>
    </div>
  );
}
