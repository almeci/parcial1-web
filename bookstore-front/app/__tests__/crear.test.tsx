import { render, screen } from "@testing-library/react";
import CreateAuthors from "@/app/crear/page";
import userEvent from "@testing-library/user-event";

jest.mock("@/app/context/AuthorsContext", () => ({
  useAuthors: () => ({ authors: [], setAuthors: jest.fn() }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => "/crear",
}));

// const setup = () => {
//   const user = userEvent.setup()
//   render(<CreateAuthors />)
//   const nameInput = screen.getByLabelText(/nombre/i) as HTMLInputElement
//   return { user, nameInput }
// }

// Pruebas de render

describe("Render de /crear", () => {
  test("muestra los campos del formulario y el botón", () => {
    render(<CreateAuthors />);

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fecha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/imagen/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /guardar/i }),
    ).toBeInTheDocument();
  });
});

// Pruebas de interaccion

describe("Interacción en /crear", () => {
  test("muestra errores al enviar formulario vacío", async () => {
    const user = userEvent.setup();
    render(<CreateAuthors />);

    await user.click(screen.getByRole("button", { name: /guardar/i }));

    expect(
      await screen.findByText(/nombre es obligatorio/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/descripción es obligatoria/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/fecha de nacimiento es obligatoria/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/imagen es obligatoria/i),
    ).toBeInTheDocument();
  });
});

// Pruebas parametrizadas

describe("Validación parametrizada en /crear", () => {
  test.each([
    { label: /nombre/i, value: "Gabriel García Márquez", testId: "name" },
    {
      label: /descripción/i,
      value: "Escritor colombiano",
      testId: "description",
    },
    { label: /fecha/i, value: "1927-03-06", testId: "birthDate" },
    { label: /imagen/i, value: "https://imagen.com/foto.jpg", testId: "image" },
  ])("acepta input válido en campo $testId", async ({ label, value }) => {
    const user = userEvent.setup();
    render(<CreateAuthors />);

    const input = screen.getByLabelText(label);
    await user.type(input, value);

    expect(input).toHaveValue(value);
  });
});
