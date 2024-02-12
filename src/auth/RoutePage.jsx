import { jwtDecode } from "jwt-decode";
import secureLocalStorage from "react-secure-storage";
import Home from "../components/Home";
import Login from "../pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Contact from "../pages/Contact";
import Logout from "../pages/Logout";
import Profile from "../pages/Profile";
import NoPage from "../components/NoPage";

const RoutePage = () => {
  let refreshExpiretion = new Date();
  const refreshToken = secureLocalStorage.getItem("refreshToken");
  if (refreshToken) {
    try {
      refreshExpiretion = new Date(jwtDecode(refreshToken).exp * 1000);
    } catch (error) {
      console.log(error);
    }
  }

  const navItems = [
    { path: "/", element: <Home />, isPrivate: false, isLogin: true },
    { path: "/login", element: <Login />, isPrivate: false, isLogin: true },
    {
      path: "/about",
      element: <h1>About</h1>,
      isPrivate: false,
      isLogin: true,
    },
    {
      path: "/register",
      element: <Register />,
      isPrivate: false,
      isLogin: false,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
      isPrivate: false,
      isLogin: false,
    },
    {
      path: "/contacts",
      element: <Contact />,
      isPrivate: true,
      isLogin: true,
    },
    {
      path: "/logout",
      element: <Logout />,
      isPrivate: true,
      isLogin: true,
    },
    {
      path: "/profile",
      element: <Profile />,
      isPrivate: true,
      isLogin: true,
    },
    {
      path: "*",
      element: <NoPage />,
      isPrivate: false,
      isLogin: true,
    },
  ];

  const buildNav = () => {
    return navItems.map((navItem, index) => {
      const accessToken = secureLocalStorage.getItem("accessToken");
      if (!accessToken && !navItem.isPrivate) {
        return (
          <Route key={index} path={navItem.path} element={navItem.element} />
        );
      } else if (accessToken) {
        if (navItem.isLogin && refreshExpiretion <= new Date()) {
          return <Route key={index} path={navItem.path} element={<Login />} />;
        } else {
          return (
            <Route key={index} path={navItem.path} element={navItem.element} />
          );
        }
      } else {
        return <Route key={index} path={navItem.path} element={<Home />} />;
      }
    });
  };

  return (
    <BrowserRouter>
      <Routes>{buildNav()}</Routes>
    </BrowserRouter>
  );
};

export default RoutePage;