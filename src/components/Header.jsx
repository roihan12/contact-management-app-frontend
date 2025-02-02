import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";

const Header = () => {
  const user = secureLocalStorage.getItem("user");
  const auth = secureLocalStorage.getItem("accessToken");

  let name = "user";
  let email = "user@example.com";
  if (user) {
    name = user.fullName;
    email = user.email;
  }
  const navigate = useNavigate();

  const handleLogout = () => {
    secureLocalStorage.removeItem("acessToken");
    secureLocalStorage.removeItem("refreshToken");
    secureLocalStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <>
      {!auth ? (
        <Navbar
          fluid
          rounded
          className="bg-white border-b border-gray-700 fixed z-30 w-full"
        >
          <Navbar.Brand
            href="https://flowbite-react.com"
            className="self-center whitespace-nowrap text-2xl text-[#402fda] font-bold dark:text-white"
          >
            {" "}
            Flow
            <span color="blue" className="text-2xl text-[#3156bb] font-bold">
              Contact
            </span>
          </Navbar.Brand>
          <div className=" sm:flex md:order-2 space-x-3 ">
            <Link to={"/login"}>
              <Button color="light" className="hidden sm:block">
                Login
              </Button>
            </Link>
            <Link to={"/register"}>
              <Button color="blue" className="hidden sm:block">
                Register
              </Button>
            </Link>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link href="#">Home</Navbar.Link>
            <Navbar.Link href="#">About</Navbar.Link>
            <Navbar.Link href="#">Services</Navbar.Link>
            <Navbar.Link href="#">Pricing</Navbar.Link>
            <Navbar.Link href="#">Contact</Navbar.Link>
            <Navbar.Link href="#" className="md:hidden">
              <Link to={"/login"}>
                <Button color="light">Login</Button>
              </Link>
            </Navbar.Link>
            <Navbar.Link href="/register" className="md:hidden">
              <Link to={"/register"}>
                <Button color="blue">Register</Button>
              </Link>
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      ) : (
        <Navbar fluid rounded>
          <Navbar.Brand href="/">
            <span className="self-center whitespace-nowrap text-2xl text-[#280274] font-bold dark:text-white">
              Flow
            </span>{" "}
            <span className="text-2xl text-[#3652AD] font-bold">Contact</span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  placeholderInitials={name.split(" ")[0].split("")[0]}
                  alt="User settings"
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{name}</span>
                <span className="block truncate text-sm font-medium">
                  {email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item href="/profile">Settings</Dropdown.Item>
              <Dropdown.Item onClick={() => handleLogout()}>
                Logout
              </Dropdown.Item>
            </Dropdown>
          </div>
        </Navbar>
      )}
    </>
  );
};

export default Header;
