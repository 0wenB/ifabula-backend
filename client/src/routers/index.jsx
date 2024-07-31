import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../views/login";
import Register from "../views/register";
import Parent from "../views/parent";
import AvailableBooks from "../views/availableBooks";
import MyBook from "../views/myBook";
import AdminDashboard from "../views/adminDashboard";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Login />,
    loader: async () => {
      if (localStorage.getItem("token")) {
        return redirect("/main" || "/admin-dashboard");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <Register />,
    loader: async () => {
      if (localStorage.getItem("token")) {
        return redirect("/main");
      }
      return null;
    },
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />,
    loader: async () => {
      if (!localStorage.getItem("token")) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    element: <Parent />,
    children: [
      {
        path: "/main",
        element: <AvailableBooks />,
      },
      {
        path: "/my-book",
        element: <MyBook />,
      },
    ],
    loader: async () => {
      if (!localStorage.getItem("token")) {
        return redirect("/");
      }
      return null;
    },
  },
]);

export default router;
