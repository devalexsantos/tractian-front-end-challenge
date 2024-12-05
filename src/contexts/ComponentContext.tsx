import { createContext, useEffect, useState } from "react";
import { Asset } from "../types";
import { useParams } from "react-router-dom";

interface ComponentContextProps {
  currentComponent: Asset | null;
  setComponent: (component: Asset) => void;
}

export const ComponentContext = createContext({} as ComponentContextProps);

export function ComponentProvider({
  children
}: {
  children: React.ReactNode
}
) {
  const [currentComponent, setCurrentComponent] = useState<Asset | null>(null);

  const { companyId } = useParams();

  const setComponent = (component: Asset) => {
    setCurrentComponent(component);
  }

  useEffect(() => {
    setCurrentComponent(null);
  }, [companyId]);

  return (
    <ComponentContext.Provider value={{
      currentComponent,
      setComponent,
    }}>{children}</ComponentContext.Provider>
  );
}
