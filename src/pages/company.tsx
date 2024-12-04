import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getAssets, getLocations } from "../services/api";
import { AssetTree } from "../components/AssetTree";
import { Asset } from "../types";
import { Location } from "../types";

export function Company() {
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


  const combinedData = React.useMemo(() => {
    const locationMap: { [key: string]: Location } = {};

    // Crreate a Locations/Sub-Locations
    locations?.forEach((location) => {
      locationMap[location.id] = { ...location, type: 'location', children: [] };
      if (location.parentId) {
        const parent = locationMap[location.parentId];
        if (parent) {
          parent.children.push(locationMap[location.id]);
        }
      }
    });

    const assetMap: { [key: string]: any } = {};

    // Process Assets and Components
    assets?.forEach((asset) => {
      const isComponent = asset.sensorType !== null;
      const isSubAsset = asset.parentId !== null;

      if (isComponent) {
        // Components associated a Assets/Sub-Assets or Locations
        const parent =
          asset.parentId ? assetMap[asset.parentId] : locationMap[asset.locationId as string];
        if (parent) {
          parent.children.push({ ...asset, type: 'component', children: [] });
        } else {
          // Components not associated
          assetMap[asset.id] = { ...asset, type: 'component', children: [] };
        }
      } else if (isSubAsset) {
        // Sub-Assets associeteds with Assets
        assetMap[asset.id] = { ...asset, type: 'asset', children: [] };
        const parent = assetMap[asset.parentId as string];
        if (parent) {
          parent.children.push(assetMap[asset.id]);
        }
      } else if (asset.locationId) {
        // Assets associated with locations
        assetMap[asset.id] = { ...asset, type: 'asset', children: [] };
        const location = locationMap[asset.locationId];
        if (location) {
          location.children.push(assetMap[asset.id]);
        }
      } else {
        // Assets not associateds
        assetMap[asset.id] = { ...asset, type: 'asset', children: [] };
      }
    });

    // Combine Locations and Assets not associateds on root
    return [
      ...Object.values(locationMap).filter((location) => !location.parentId),
      ...Object.values(assetMap).filter((asset) => !asset.locationId && !asset.parentId),
    ];
  }, [locations, assets]);




  return (
    <div>
      <h1>Asset Tree View</h1>
      <div>
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
      </div>
      <AssetTree data={combinedData} filters={filters} />
    </div>
  );
}
