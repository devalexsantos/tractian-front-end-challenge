import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { getAssets, getLocations } from "../services/api";
import { AssetTree } from "../components/AssetTree";
import { Asset } from "../types";
import { Location } from "../types";
import { combineCompanyData } from "../utils/combine-company-data";
import { CompanyContext } from "../contexts/CompanyContext";

export function Company() {
  const { currentCompany } = useContext(CompanyContext);

  const { id } = useParams();

  const [filters, setFilters] = useState({
    searchText: '',
    energySensorsOnly: false,
    criticalStatusOnly: false,
  });

  const { data: locations } = useQuery<Location[]>({
    queryKey: ['locations', id],
    queryFn: () => getLocations(id as string),
  });

  const { data: assets } = useQuery<Asset[]>({
    queryKey: ['assets', id],
    queryFn: () => getAssets(id as string),
  });


  const data = combineCompanyData({ locations, assets });

  return (
    <div className="flex flex-col gap-3 flex-1 p-4 rounded border border-[#D8DFE6] m-2">
      <header className="flex justify-between">
        <div className="flex items-center gap-2">
          <h1>Ativos</h1>
          <span>/</span>
          <h2>{currentCompany?.name}</h2>
        </div>
      </header>
      <h1>Asset Tree View</h1>
      <div className="h-full">
        <input
          type="text"
          placeholder="Search..."
          value={filters.searchText}
          onChange={(e) => setFilters({ ...filters, searchText: e.target.value })}
        />
        <label>
          <input
            type="checkbox"
            checked={filters.energySensorsOnly}
            onChange={(e) => setFilters({ ...filters, energySensorsOnly: e.target.checked })}
          />
          Energy Sensors Only
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.criticalStatusOnly}
            onChange={(e) => setFilters({ ...filters, criticalStatusOnly: e.target.checked })}
          />
          Critical Status Only
        </label>
        <AssetTree data={data} filters={filters} />
      </div>
    </div>
  );
}
