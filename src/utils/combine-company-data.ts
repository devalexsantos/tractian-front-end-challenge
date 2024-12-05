import { useMemo } from "react";
import { Asset, Location } from "../types";

type CombineCompanyDataProps = {
  locations?: Location[];
  assets?: Asset[];
};

export function combineCompanyData({ locations, assets }: CombineCompanyDataProps) {
  const combinedData = useMemo(() => {
    const locationMap = new Map<string, Location & { type: string; children: any[] }>();
    const assetMap = new Map<string, any>();

    // Create a Locations/Sub-Locations
    locations?.forEach((location) => {
      const currentLocation = { ...location, type: "location", children: [] };
      locationMap.set(location.id, currentLocation as Location);

      if (location.parentId) {
        const parent = locationMap.get(location.parentId);
        if (parent) {
          parent.children.push(currentLocation);
        }
      }
    });

    // Process Assets and Components
    assets?.forEach((asset) => {
      const isComponent = asset.sensorType !== null;
      const isSubAsset = asset.parentId !== null;

      const currentAsset = { ...asset, type: isComponent ? "component" : "asset", children: [] };
      assetMap.set(asset.id, currentAsset);

      // If it's a component
      if (isComponent) {
        const parent =
          asset.parentId ? assetMap.get(asset.parentId) : locationMap.get(asset.locationId as string);
        if (parent) {
          parent.children.push(currentAsset);
        }
        return;
      }

      // If it's a sub-asset
      if (isSubAsset) {
        const parent = assetMap.get(asset.parentId as string);
        if (parent) {
          parent.children.push(currentAsset);
        }
        return;
      }

      // If it's associated with a location
      if (asset.locationId) {
        const location = locationMap.get(asset.locationId);
        if (location) {
          location.children.push(currentAsset);
        }
        return;
      }
    });

    // Combine Locations and Assets not associated on root
    const rootLocations = Array.from(locationMap.values()).filter((location) => !location.parentId);
    const unassociatedAssets = Array.from(assetMap.values()).filter(
      (asset) => !asset.locationId && !asset.parentId
    );

    return [...rootLocations, ...unassociatedAssets];
  }, [locations, assets]);

  return combinedData;
}
