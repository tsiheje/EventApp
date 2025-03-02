
import Login from "./Login";

import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../../store";

// Mock de `useAuthStore`
jest.mock("../../store", () => ({
  __esModule: true,
  default: () => ({
    login: jest.fn(),
    isLoading: false,
  }),
}));

// Mock de `toast`
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Login Component", () => {
  test("Affiche le formulaire avec les champs email et mot de passe", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
  });

  test("Affiche un message d'erreur si l'email est vide", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.submit(screen.getByRole("button", { name: /Se connecter/i }));

    expect(await screen.findByText(/L'email est requis./i)).toBeInTheDocument();
  });

  test("Affiche un message d'erreur si le mot de passe est vide", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.submit(screen.getByRole("button", { name: /Se connecter/i }));

    expect(await screen.findByText(/Le mot de passe est requis./i)).toBeInTheDocument();
  });

  test("Envoie les données lorsque le formulaire est valide", async () => {
    const mockLogin = jest.fn().mockResolvedValue({ token: "fake-token" });
    useAuthStore.mockReturnValue({ login: mockLogin, isLoading: false });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Se connecter/i }));

    expect(mockLogin).toHaveBeenCalledWith({
      email: "test@example.com",
      motDePasse: "password123",
    });

    expect(toast.success).toHaveBeenCalledWith("Connexion réussie");
  });

  test("Affiche un message d'erreur si la connexion échoue", async () => {
    const mockLogin = jest.fn().mockRejectedValue({
      response: { data: { error: "Identifiants incorrects" } },
    });

    useAuthStore.mockReturnValue({ login: mockLogin, isLoading: false });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "wrong@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Se connecter/i }));

    expect(await screen.findByText(/Identifiants incorrects/i)).toBeInTheDocument();
    expect(toast.error).toHaveBeenCalledWith("Identifiants incorrects");
  });
});
