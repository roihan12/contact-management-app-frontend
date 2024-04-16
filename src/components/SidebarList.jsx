import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiUser,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const SidebarList = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    secureLocalStorage.removeItem("acessToken");
    secureLocalStorage.removeItem("refreshToken");
    secureLocalStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      className="h-screen"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/" icon={HiChartPie}>
            <span className="hidden sm:block">Dashboard</span>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiInbox}>
            <span className="hidden sm:block">Inbox</span>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            <span className="hidden sm:block">Users</span>
          </Sidebar.Item>
          <Sidebar.Item
            href="/contacts"
            as={Link}
            to={"/contacts"}
            icon={HiShoppingBag}
          >
            <span className="hidden sm:block">Contacts</span>
          </Sidebar.Item>

          <Sidebar.Item
            icon={HiArrowSmRight}
            as={Link}
            onClick={() => handleLogout()}
          >
            <span className="hidden sm:block">Logout</span>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SidebarList;
