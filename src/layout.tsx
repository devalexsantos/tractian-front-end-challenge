import { Outlet } from "react-router-dom";
import { HeaderLayout } from "./components/layout/Header";

export function RootLayout() {
  return (
    <div className="flex flex-col">
      <HeaderLayout />
      <Outlet />
    </div>
  )
}
