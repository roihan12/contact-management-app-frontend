import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";

const Header = () => {
  const user = secureLocalStorage.getItem("user");
  const auth = secureLocalStorage.getItem("accessToken");

  let name = "user";
  if (user) {
    name = user.fullName;
  }

  return (
    <>
      {!auth ? (
        <Navbar fluid rounded>
          <Navbar.Brand
            href="https://flowbite-react.com"
            className="self-center whitespace-nowrap text-2xl text-[#6C22A6] font-bold dark:text-white"
          >
            {" "}
            Flow
            <span className="text-2xl text-[#0E21A0] font-bold">Contact</span>
          </Navbar.Brand>
          <div className=" sm:flex md:order-2 space-x-3 ">
            <Link to={"/login"}>
              <Button color="light" className="hidden sm:block">
                Login
              </Button>
            </Link>
            <Link to={"/register"}>
              <Button color="blue" className="hidden sm:block">
                Sign Up
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
                <Button color="light">
                  Login
                </Button>
              </Link>
            </Navbar.Link>
            <Navbar.Link href="/register" className="md:hidden">
              <Link to={"/register"}>
                <Button color="blue">
                  Sign Up
                </Button>
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
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{name}</span>
                <span className="block truncate text-sm font-medium">
                  name@flowbite.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
        </Navbar>
      )}
    </>
  );
};

export default Header;
