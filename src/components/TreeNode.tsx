import { useContext, useState } from "react";
import switcher from '../assets/icons/tree-switcher.svg';
import locationIcon from '../assets/icons/location-icon.svg';
import assetIcon from '../assets/icons/asset-icon.svg';
import componentIcon from '../assets/icons/component.svg';
import bolt from '../assets/icons/bolt.svg';
import { Asset } from "../types";
import { ComponentContext } from "../contexts/ComponentContext";

interface TreeNodeProps {
  node: Asset
}

export function TreeNode({ node }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { currentComponent, setComponent } = useContext(ComponentContext);

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

  const nodeType = getType();


  return (
    <div className="flex flex-col">
      <div className="flex h-full">
        <div className="flex items-center">
          {
            hasChildren
              ? isExpanded
                ?
                <div className="flex flex-col items-center h-full">
                  <img src={switcher} alt="arrow down" />
                  <div className="h-full w-[1px] bg-zinc-300" />
                </div>
                :
                <img src={switcher} alt="arrow down" className="transform" />
              :
              nodeType === 'location' ?
                <div className="w-6 h-6" />
                :
                <div className="w-3 h-6" />
          }
        </div>
        <div className={`w-full flex flex-col ${(currentComponent?.id === node.id && nodeType === "component") && ' bg-blue-500 text-white'
          }`}>
          <div className="flex items-center gap-1 p-[2px]">
            {
              nodeType === 'location' &&
              <img src={locationIcon} />
            }
            {
              nodeType === 'asset' &&
              <div className="flex">
                <img src={assetIcon} />
              </div>
            }
            {
              nodeType === 'component' &&
              <div className="flex items-center">
                <div className="w-[10px] h-[1px] bg-zinc-300" />
                <img src={componentIcon} />
              </div>
            }

            <div
              onClick={() => {
                if (nodeType === 'component') {
                  setComponent(node);
                }
                setIsExpanded(!isExpanded)
              }
              }
              className={`cursor-pointer flex items-center gap-1
                }`}
            >
              {node.name} {node.sensorType === 'energy' &&
                <img src={bolt} alt="energy icon" />
              }
            </div>
          </div>

          {hasChildren && isExpanded && (
            <div className="flex flex-col">
              {node.children.map((child: any) => (
                <TreeNode key={child.id} node={child} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TreeNode;
