import { Button, TextInput } from "flowbite-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ForgotPasswordForm = ({
  handleSubmit,
  inputData,
  setInputData,
  setForgotPasswordLoading,
}) => {
  return (
    <div className="w-full max-w-md mx-auto max-sm:mt-40 p-6 2xl:mt-40">
      <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Remember your password?{" "}
              <Link
                to={"/login"}
                className="text-blue-600 decoration-2 hover:underline font-medium"
              >
                Login here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">
                    Email address
                  </label>
                  <div className="relative">
                    <TextInput
                      type="email"
                      id="email"
                      name="email"
                      className=" w-full  border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                      aria-describedby="email-error"
                      onChange={(e) =>
                        setInputData({ ...inputData, email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Button
                  isProcessing={setForgotPasswordLoading}
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Reset password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  inputData: PropTypes.object.isRequired,
  setInputData: PropTypes.func.isRequired,
  setForgotPasswordLoading: PropTypes.bool.isRequired,
};

export default ForgotPasswordForm;
