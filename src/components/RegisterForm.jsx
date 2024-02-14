import { Badge, Button, Label, TextInput } from "flowbite-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import undrawillustration from "../assets/undraw_completed_tasks_vs6q.svg";
import Google from "../assets/googleIcon.svg";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setRegisterUser } from "../features/userSlice";

const RegisterForm = ({
  handleSubmit,
  // inputData,
  // setInputData,
  register,
  errors,
  watch,
  reset,
  setRegisterUserLoading,
}) => {
  const password = useRef({});
  password.current = watch("password", "");

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log(data);
    dispatch(setRegisterUser(data));
    reset();
  };

  console.log(errors);

  return (
    <div className="py-20 lg:py-6 2xl:py-40">
      <div className="flex flex-row-reverse bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div className="hidden lg:block lg:w-1/2">
          <img
            src={undrawillustration}
            alt="illustrations"
            className="object-contain h-60 w-96 mt-40"
          />
        </div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-bold text-blue-700 text-center">
            FlowContact
          </h2>
          <a
            href="#"
            className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
            aria-label="Sign in with Google"
          >
            <div className="px-4 py-3 ">
              <img src={Google} alt="" className="h-6 w-6" />
            </div>
            <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
              Sign in with Google
            </h1>
          </a>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5"></span>
            <a href="#" className="text-xs text-gray-500 uppercase">
              or Register with email
            </a>
            <span className="border-b w-1/5"></span>
          </div>
          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email2" value="Your email" />
              </div>
              <TextInput
                id="email2"
                type="email"
                placeholder="name@flowbite.com"
                shadow
                // onChange={(e) =>
                //     setInputData({ ...inputData, email: e.target.value })
                //   }
                {...register("email", {
                  required: "required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
              />
              {errors?.email && (
                <Badge color="failure">{errors.email.message}</Badge>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="fullName" value="Your name" />
              </div>
              <TextInput
                id="fullName"
                type="text"
                placeholder="John Smith"
                shadow
                // onChange={(e) =>
                //     setInputData({ ...inputData, fullName: e.target.value })
                //   }
                {...register("fullName", {
                  required: "You must specify a full name",
                  minLength: {
                    value: 2,
                    message: "Full name must have at least 2 characters",
                  },
                })}
              />
              {errors?.fullName && (
                <Badge color="failure">{errors.fullName.message}</Badge>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password2" value="Your password" />
              </div>
              <TextInput
                id="password"
                name="password"
                type="password"
                shadow
                // onChange={(e) =>
                //     setInputData({ ...inputData, password: e.target.value })
                //   }

                {...register("password", {
                  required: "You must specify a password",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                })}
              />
              {errors?.password && (
                <Badge color="failure">{errors.password.message}</Badge>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="repeat-password" value="Repeat password" />
              </div>
              <TextInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                shadow
                // onChange={(e) =>
                //     setInputData({ ...inputData, confirmPassword: e.target.value })
                //   }
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
              />
              {errors?.confirmPassword && (
                <Badge color="failure">{errors.confirmPassword.message}</Badge>
              )}
            </div>
            <Button
              color="blue"
              isProcessing={setRegisterUserLoading}
              type="submit"
            >
              Register new account
            </Button>
          </form>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5"></span>
            <span className="text-xs text-gray-500 uppercase">
              or You have an account?{" "}
              <Link to={"/login"} className="text-blue-500">
                Login here
              </Link>
            </span>
            <span className="border-b w-1/5"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  watch: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  // setInputData: PropTypes.func.isRequired,
  setRegisterUserLoading: PropTypes.bool.isRequired,
};

export default RegisterForm;
