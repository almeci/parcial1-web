import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateAuthors from "@/app/crear/page";

// Simular el context
jest.mock("@/app/context/AuthorsContext", () => ({
  useAuthors: () => ({
    authors: [],
    setAuthors: jest.fn(),
  }),
}));

// Simular useRouter
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));
