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

  const { companyId } = useParams();

  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
  })

  const setCompany = (company: Company) => {
    setCurrentCompany(company);
  }

  useEffect(() => {
    if (companies) {
      const company = companies.find((company: Company) => company.id === companyId);
      if (company) {
        setCurrentCompany(company);
      }
    }
  }, [companies, companyId]);




  return <CompanyContext.Provider value={{
    currentCompany,
    setCompany,
    isLoading,
    companies,
  }}>{children}</CompanyContext.Provider>;
}
