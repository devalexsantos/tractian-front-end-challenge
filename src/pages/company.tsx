import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { getAssets, getLocations } from "../services/api";
import { AssetTree } from "../components/AssetTree";
import { Asset } from "../types";
import { Location } from "../types";
import { combineCompanyData } from "../utils/combine-company-data";
import { CompanyContext } from "../contexts/CompanyContext";
import searchIcon from "../assets/icons/search-icon.svg";
import blueBoltIcon from "../assets/icons/bolt-blue.svg";
import { FilterButton } from "../components/FilterButon";
import { ComponentView } from "../components/ComponentView";

export function Company() {
  const { currentCompany } = useContext(CompanyContext);

  const { companyId } = useParams();

  const [filters, setFilters] = useState({
    searchText: '',
    energySensorsOnly: false,
    criticalStatusOnly: false,
  });

  const { data: locations } = useQuery<Location[]>({
    queryKey: ['locations', companyId],
    queryFn: () => getLocations(companyId as string),
  });

  const { data: assets } = useQuery<Asset[]>({
    queryKey: ['assets', companyId],
    queryFn: () => getAssets(companyId as string),
  });


  const data = combineCompanyData({ locations, assets });

  return (
    <div className="flex flex-col h-full gap-3 flex-1 p-4 rounded border border-[#D8DFE6] m-2">
      <header className="flex justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Ativos</h1>
          <span className="text-gray-600 text-sm">/</span>
          <h2 className="text-gray-600 text-sm">{currentCompany?.name}</h2>
        </div>

        <div className="flex items-center gap-2">
          <FilterButton
            onCheck={() => setFilters({ ...filters, energySensorsOnly: !filters.energySensorsOnly })}
            checked={filters.energySensorsOnly}
            icon={{
              svg: blueBoltIcon,
              alt: "Ícone de Sensor de Energia"
            }}
          >
            Sensor de Energia
          </FilterButton>

          <FilterButton
            onCheck={() => setFilters({ ...filters, criticalStatusOnly: !filters.criticalStatusOnly })}
            checked={filters.criticalStatusOnly}
            icon={{
              svg: blueBoltIcon,
              alt: "Ícone de Crítico"
            }}
          >
            Crítico
          </FilterButton>
        </div>
      </header>

      <div className="flex gap-2 h-full">
        <aside className="h-full w-full max-w-md rounded border border-[#D8DFE6]">
          <div className="flex border-b py-1 pr-3">
            <input
              className="w-full outline-none bg-white py-1 px-3"
              type="text"
              placeholder="Buscar Ativo ou Local"
              value={filters.searchText}
              onChange={(e) => setFilters({ ...filters, searchText: e.target.value })}
            />
            <img src={searchIcon} alt="search" />
          </div>
          <AssetTree data={data} filters={filters} />
        </aside>

        <ComponentView />

      </div>
      <div>
      </div>
    </div>
  );
}
