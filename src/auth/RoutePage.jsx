import { jwtDecode } from "jwt-decode";
import secureLocalStorage from "react-secure-storage";
import Home from "../components/Home";
import Login from "../pages/Login";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Contact from "../pages/Contact";
import Logout from "../pages/Logout";
import Profile from "../pages/Profile";
import NoPage from "../components/NoPage";
import Header from "../components/Header";
import SidebarList from "../components/SidebarList";
import { Footer } from "flowbite-react";

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
  const Layout = () => {
    return (
      <div className="main">
        <Header />
        <div className="container">
          <div className="menuContainer">
            <SidebarList />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  const navItems = [
    // { path: "/", element: <Home />, isPrivate: false, isLogin: true },
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
      path: "/",
      element: <Layout />,
      isPrivate: true,
      isLogin: true,
      children: [
        {
          path: "/contacts",
          element: <Contact />,
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
          path: "/logout",
          element: <Logout />,
          isPrivate: true,
          isLogin: true,
        },
      ],
    },
    {
      path: "*",
      element: <NoPage />,
      isPrivate: false,
      isLogin: true,
    },
  ];

  const buildNav = () => {
    const accessToken = secureLocalStorage.getItem("accessToken");

    return navItems.map((navItem, index) => {
      if (!accessToken && !navItem.isPrivate) {
        return (
          <Route key={index} path={navItem.path} element={navItem.element} />
        );
      } else if (accessToken) {
        if (
          navItem.children &&
          navItem.children.some((child) => child.isLogin)
        ) {
          // Check for access token and expiration here
          // Assuming refreshExpiretion is defined elsewhere
          if (refreshExpiretion <= new Date()) {
            return (
              <Route key={index} path={navItem.path} element={<Login />} />
            );
          } else {
            return navItem.children.map((navLayout, childIndex) => (
              <Route
                key={childIndex}
                path={navLayout.path}
                element={navLayout.element}
              />
            ));
          }
        }
      } else {
        return <Route key={index} path={navItem.path} element={<Home />} />;
      }
    });
  };

  // const buildNav = () => {
  //   return navItems.map((navItem, index) => {
  //     const accessToken = secureLocalStorage.getItem("accessToken");
  //     if (!accessToken && !navItem.isPrivate) {
  //       return (
  //         <Route key={index} path={navItem.path} element={navItem.element} />
  //       );
  //     } else if (accessToken) {
  //       if (navItem.children.isLogin && refreshExpiretion <= new Date()) {
  //         return <Route key={index} path={navItem.path} element={<Login />} />;
  //       } else {
  //         navItem.children.map((navLayout, index) => {
  //           return (
  //             <Route
  //               key={index}
  //               path={navLayout.path}
  //               element={navLayout.element}
  //             />
  //           );
  //         });
  //       }
  //     } else {
  //       return <Route key={index} path={navItem.path} element={<Home />} />;
  //     }
  //   });
  // };

  return (
    <BrowserRouter>
      <Routes>{buildNav()}</Routes>
    </BrowserRouter>
  );
};

export default RoutePage;
