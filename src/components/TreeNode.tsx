import { useState } from "react";

interface TreeNodeProps {
  node: any;
}

export function TreeNode({ node }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

  const getType = () => {
    if (node.sensorType) {
      return 'component';
    }
    if (node.locationId || node.parentId) {
      return 'asset';
    }
    return 'location';
  };


  return (
    <li>
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: 'pointer', fontWeight: hasChildren ? 'bold' : 'normal' }}
      >
        {node.name} - {getType()}
      </div>
      {hasChildren && isExpanded && (
        <ul>
          {node.children.map((child: any) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;
