import { render, screen } from "@testing-library/react";
import CreateAuthors from "@/app/crear/page";
import userEvent from "@testing-library/user-event";

// Mock de setAuthors que se puede espiar
const mockSetAuthors = jest.fn();

jest.mock("@/app/context/AuthorsContext", () => ({
  useAuthors: () => ({ authors: [], setAuthors: mockSetAuthors }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => "/crear",
}));

// Limpiar mocks antes de cada prueba
beforeEach(() => {
  mockSetAuthors.mockClear();
});

// const setup = () => {
//   const user = userEvent.setup()
//   render(<CreateAuthors />)
//   const nameInput = screen.getByLabelText(/nombre/i) as HTMLInputElement
//   return { user, nameInput }
// }

// Pruebas de render

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

// Pruebas parcial

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

  test("el boton de envio esta deshabilitado inicialmente", async () => {
    const user = userEvent.setup();
    render(<CreateAuthors />);

    const submitButton = screen.getByRole("button", { name: /guardar/i });
    expect(submitButton).toHaveAttribute("aria-disabled", "true");
    await user.click(submitButton);
    expect(mockSetAuthors).not.toHaveBeenCalled();
  });
});

describe("Validacion requisitos en /crear", () => {
  test("muestra mensajes de error especificos y mantiene deshabilitado el boton con datos incompletos", async () => {
    const user = userEvent.setup();
    render(<CreateAuthors />);

    const nameInput = screen.getByLabelText(/nombre/i);
    const descriptionInput = screen.getByLabelText(/descripción/i);
    const submitButton = screen.getByRole("button", { name: /guardar/i });

    // Verificación semántica inicial
    expect(submitButton).toHaveAttribute("aria-disabled", "true");

    await user.type(nameInput, "Sylvia Plath");
    await user.type(descriptionInput, "Escritora nacida en EEUU en 1932");

    // Verificación semántica: botón sigue deshabilitado
    expect(submitButton).toHaveAttribute("aria-disabled", "true");

    // Intentar enviar con datos incompletos
    await user.click(submitButton);

    // Retroalimentación de error: mensajes específicos
    expect(
      await screen.findByText(/fecha de nacimiento es obligatoria/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/imagen es obligatoria/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/nombre es obligatorio/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/descripción es obligatoria/i),
    ).not.toBeInTheDocument();

    // VERIFICACIÓN FUNCIONAL 1: setAuthors NO debe haberse llamado
    expect(mockSetAuthors).not.toHaveBeenCalled();

    // VERIFICACIÓN FUNCIONAL 2: Los campos NO se resetean (el submit no se ejecutó)
    expect(nameInput).toHaveValue("Sylvia Plath");
    expect(descriptionInput).toHaveValue("Escritora nacida en EEUU en 1932");

    // Verificación semántica: botón sigue deshabilitado después del intento
    expect(submitButton).toHaveAttribute("aria-disabled", "true");

    // Completar campos faltantes
    const birthDateInput = screen.getByLabelText(/fecha/i);
    const imageInput = screen.getByLabelText(/imagen/i);
    await user.type(birthDateInput, "1932-10-27");
    await user.type(imageInput, "https://img.com/sylvia.jpg");

    // Ahora el botón debe estar habilitado
    expect(submitButton).toHaveAttribute("aria-disabled", "false");

    // Enviar formulario completo
    await user.click(submitButton);

    // VERIFICACIÓN FUNCIONAL 3: Ahora sí se debe llamar setAuthors
    expect(mockSetAuthors).toHaveBeenCalledTimes(1);

    // VERIFICACIÓN FUNCIONAL 4: Los campos se resetean (submit exitoso)
    expect(nameInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
    expect(birthDateInput).toHaveValue("");
    expect(imageInput).toHaveValue("");
  });
});
