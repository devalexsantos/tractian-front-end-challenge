import { Asset } from "../types";
import TreeNode from "./TreeNode";

interface AssetTreeProps {
  data: Asset[];
  filters: {
    searchText: string;
    energySensorsOnly: boolean;
    criticalStatusOnly: boolean;
  };
}

export function AssetTree({ data, filters }: AssetTreeProps) {
  const filterTree = (node: Asset): boolean => {
    // Filter by text
    if (filters.searchText) {
      const matches = node.name.toLowerCase().includes(filters.searchText.toLowerCase());
      const hasMatchingChild = node.children?.some(filterTree);
      return matches || hasMatchingChild;
    }

    // Sensor energy filter
    if (filters.energySensorsOnly) {
      const isEnergySensor = node.sensorType === 'energy';
      const hasEnergyChild = node.children?.some(filterTree);
      return isEnergySensor || hasEnergyChild;
    }

    // Critical Status filter
    if (filters.criticalStatusOnly) {
      const isCritical = node.status === 'critical';
      const hasCriticalChild = node.children?.some(filterTree);
      return isCritical || hasCriticalChild;
    }

    return true; // No filters applied 
  };

  const filteredData = data.filter(filterTree);

  return (
    <ul>
      {filteredData.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </ul>
  );
};

