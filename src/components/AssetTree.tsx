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
  const filterTreeWithHierarchy = (node: any): any => {

    // Filter by text
    if (filters.searchText) {
      const matches = node.name.toLowerCase().includes(filters.searchText.toLowerCase());
      const filteredChildren = node.children
        ?.map(filterTreeWithHierarchy)
        .filter(Boolean); // Filter childrens

      if (matches || (filteredChildren && filteredChildren.length > 0)) {
        return { ...node, children: filteredChildren || [] };
      }
      return null;
    }

    // Energy sensors filter
    if (filters.energySensorsOnly) {
      const isEnergySensor = node.sensorType === 'energy';
      const filteredChildren = node.children
        ?.map(filterTreeWithHierarchy)
        .filter(Boolean); // Filter childrens

      if (isEnergySensor || (filteredChildren && filteredChildren.length > 0)) {
        return { ...node, children: filteredChildren || [] };
      }
      return null;
    }

    // Critical status filter
    if (filters.criticalStatusOnly) {
      const isCritical = node.status === 'critical';
      const filteredChildren = node.children
        ?.map(filterTreeWithHierarchy)
        .filter(Boolean); // Filter childrens

      if (isCritical || (filteredChildren && filteredChildren.length > 0)) {
        return { ...node, children: filteredChildren || [] };
      }
      return null;
    }

    return { ...node, children: node.children?.map(filterTreeWithHierarchy).filter(Boolean) };
  };

  const filteredData = data
    .map(filterTreeWithHierarchy)
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-1 py-2 px-1">
      {filteredData.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
};

