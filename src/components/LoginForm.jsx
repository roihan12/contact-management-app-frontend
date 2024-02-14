import { Button } from "flowbite-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import undrawillustration from "../assets/undraw_projections_re_ulc6.svg";
import Google from "../assets/googleIcon.svg";
const LoginForm = ({
  handleSubmit,
  inputData,
  setInputData,
  setLoginUserLoading,
}) => {
  return (
    <div className="py-20 lg:py-6 2xl:py-40">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div className="hidden lg:block lg:w-1/2" alt="Background">
          <img src={undrawillustration} alt="illustrations"   className="object-contain h-60 w-96 mt-20"/>
        </div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-bold text-blue-700 text-center">
            FlowContact
          </h2>
          <p className="text-base text-gray-600 text-center">Welcome back!</p>
          <a
            href="#"
            className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
            aria-label="Sign in with Google"
          >
            <div className="px-4 py-3 ">
             <img src={Google} alt="" className="h-6 w-6"  />
            </div>
            <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
              Sign in with Google
            </h1>
          </a>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5"></span>
            <a href="#" className="text-xs text-gray-500 uppercase">
              or login with email
            </a>
            <span className="border-b w-1/5"></span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
                onChange={(e) =>
                  setInputData({ ...inputData, email: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <Link className="text-xs text-gray-500" to={"/forgot-password"}>Forgot Password?</Link>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                autoComplete="current-password"
                onChange={(e) =>
                  setInputData({ ...inputData, password: e.target.value })
                }
              />
            </div>

            <div className="mt-8">
              <Button
               color="blue"
                className="font-bold py-2 px-4 w-full rounded hover:bg-gray-600 "
                isProcessing={setLoginUserLoading}
                type="submit"
              >
                Login
              </Button>
            </div>
          </form>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5"></span>
            <Link to={"/register"} className="text-xs text-gray-500 uppercase">
              or dont have an account? <span className="text-blue-500">register</span> 
            </Link>
            <span className="border-b w-1/5"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  inputData: PropTypes.object.isRequired,
  setInputData: PropTypes.func.isRequired,
  setLoginUserLoading: PropTypes.bool.isRequired,
};

export default LoginForm;
