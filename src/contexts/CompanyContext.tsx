import { createContext, useEffect, useState } from "react";
import { Company } from "../types";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "../services/api";

interface CompanyContextProps {
  currentCompany: Company | null;
  setCompany: (company: Company) => void;
  isLoading: boolean;
  companies: Company[] | undefined;
}

export const CompanyContext = createContext({} as CompanyContextProps);

export function CompanyProvider({
  children
}: {
  children: React.ReactNode
}
) {
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);

  const { id } = useParams();

  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
  })

  const setCompany = (company: Company) => {
    setCurrentCompany(company);
  }

  useEffect(() => {
    if (companies) {
      const company = companies.find((company: Company) => company.id === id);
      if (company) {
        setCurrentCompany(company);
      }
    }
  }, [companies, id]);




  return <CompanyContext.Provider value={{
    currentCompany,
    setCompany,
    isLoading,
    companies,
  }}>{children}</CompanyContext.Provider>;
}
