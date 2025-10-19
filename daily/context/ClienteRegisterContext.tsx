//Necessario usar interface para tipar as coisas, pois o TypeScript exige
import React, { createContext, useContext, useState, ReactNode } from "react";

interface RegisterClientProviderProps {
  children: ReactNode;
}

interface FormData {
  nome: string;
  cpf: string;
  telefone: string;
  genero: string;
}

interface RegisterContextType {
  formData: FormData;
  updateForm: (data: Partial<FormData>) => void;
}

const ClienteRegisterContext = createContext<RegisterContextType | null>(null);

export function RegisterClientProvider({ children }: RegisterClientProviderProps) {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    cpf: "",
    telefone: "",
    genero: "",
  });

  const updateForm = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <ClienteRegisterContext.Provider value={{ formData, updateForm }}>
      {children}
    </ClienteRegisterContext.Provider>
  );
}

export function useRegister() {
  const context = useContext(ClienteRegisterContext);
  if (!context) {
    throw new Error("useRegister must be used within a RegisterClientProvider");
  }
  return context;
}