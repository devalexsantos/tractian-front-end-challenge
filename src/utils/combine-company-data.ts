import { useMemo } from "react";
import { Asset, Location } from "../types";

type combineCompanyDataProps = {
  locations?: Location[];
  assets?: Asset[];
}

export function combineCompanyData({ locations, assets }: combineCompanyDataProps) {

  const combinedData = useMemo(() => {
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

  return combinedData;
}
