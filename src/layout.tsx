import { Outlet } from "react-router-dom";
import { HeaderLayout } from "./components/layout/Header";
import { ComponentProvider } from "./contexts/ComponentContext";
import { CompanyProvider } from "./contexts/CompanyContext";

export function RootLayout() {
  return (
    <CompanyProvider>
      <ComponentProvider>
        <div className="flex flex-col h-screen">
          <HeaderLayout />
          <Outlet />
        </div>
      </ComponentProvider>
    </CompanyProvider>
  )
}
