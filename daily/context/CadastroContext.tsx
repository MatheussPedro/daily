import React, { createContext, useContext, useState } from 'react';

interface CadastroData {
  nome: string;
  email: string;
  pass: string;
  endereco?: string;
  tipo?: 'cliente' | 'diarista';
}

interface CadastroContextType {
  data: CadastroData;
  setData: (newData: Partial<CadastroData>) => void;
}

const CadastroContext = createContext({} as CadastroContextType);

export const CadastroProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setCadastroData] = useState<CadastroData>({
    nome: '',
    email: '',
    pass: '',
    endereco: '',
  });

  const setData = (newData: Partial<CadastroData>) => {
    setCadastroData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <CadastroContext.Provider value={{ data, setData }}>
      {children}
    </CadastroContext.Provider>
  );
};

export const useCadastro = () => useContext(CadastroContext);
