import { jwtDecode } from "jwt-decode";
import secureLocalStorage from "react-secure-storage";
import Login from "../pages/Login";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Contact from "../pages/Contact";
import Profile from "../pages/Profile";
import NoPage from "../components/NoPage";
import Header from "../components/Header";
import SidebarList from "../components/SidebarList";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import Home from "../components/Home";
import FooterNav from "../components/FooterNav";

const RoutePage = () => {
  let refreshExpiretion = new Date();
  const refreshToken = secureLocalStorage.getItem("refreshToken");
  // const user = secureLocalStorage.getItem("user");
  const user = useSelector((state) => state.user.data);
  if (refreshToken) {
    try {
      refreshExpiretion = new Date(jwtDecode(refreshToken).exp * 1000);
    } catch (error) {
      console.log(error);
    }
  }
  const Layout = () => {
    return (
      <div className="main">
        <Header />
        <div className="container">
          <div className=" w-10 sm:w-[250px] px-1 py-1">
            <SidebarList />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <FooterNav />
      </div>
    );
  };

  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute user={user} refreshExpiretion={refreshExpiretion}>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/contacts",
          element: (
            <ProtectedRoute user={user} refreshExpiretion={refreshExpiretion}>
              <Contact />,
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute user={user} refreshExpiretion={refreshExpiretion}>
              <Profile />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <NoPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RoutePage;
