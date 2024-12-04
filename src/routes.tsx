import { createBrowserRouter } from "react-router-dom";
import { Company } from "./pages/company";
import { Companies } from "./pages/companies";
import { RootLayout } from "./layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Companies />
      },
      {
        path: "/company/:id",
        element: <Company />
      }
    ]
  },
])
