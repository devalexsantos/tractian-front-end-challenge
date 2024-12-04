import { createBrowserRouter } from "react-router-dom";
import { Company } from "./pages/company";
import { Companies } from "./pages/companies";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Companies />
  },
  {
    path: "/company/:id",
    element: <Company />
  }
])
