import { Badge, Button, TextInput } from "flowbite-react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setUpdateProfile } from "../features/userSlice";
import { useRef } from "react";
import secureLocalStorage from "react-secure-storage";

const UpdateProfileForm = ({
  handleSubmit,
  register,
  errors,
  watch,
  reset,
  setUpdateUserLoading,
}) => {
  const user = secureLocalStorage.getItem("user");
  const password = useRef({});
  password.current = watch("password", "");

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log(data);
    data.userId = user.userId;
    dispatch(setUpdateProfile(data));
    reset();
  };

  return (
    <div className="flex justify-center mt-20 px-8">
      <form className="max-w-2xl" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600">
          <h2 className="text-xl text-gray-600 dark:text-gray-300 pb-2">
            Account settings:
          </h2>

          <div className="flex flex-col gap-2 w-full border-gray-400">
            <div>
              <label className="text-gray-600 dark:text-gray-400">
                Full Name
              </label>
              <TextInput
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                type="text"
                defaultValue={user.fullName}
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
              <label className="text-gray-600 dark:text-gray-400">Email</label>
              <TextInput
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                type="email"
                disabled
                defaultValue={user.email}
                {...register("email", {
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
              <label className="text-gray-600 dark:text-gray-400">
                Password
              </label>
              <TextInput
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                type="password"
                id="password"
                name="password"
                {...register("password", {
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
              <label className="text-gray-600 dark:text-gray-400">
                Confirm Password
              </label>
              <TextInput
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
              />
              {errors?.confirmPassword && (
                <Badge color="failure">{errors.confirmPassword.message}</Badge>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                isProcessing={setUpdateUserLoading}
                className="py-1.5 px-3 m-1 text-center bg-violet-700 border rounded-md text-white  hover:bg-violet-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                type="submit"
              >
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

UpdateProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  watch: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  setUpdateUserLoading: PropTypes.bool.isRequired,
};

export default UpdateProfileForm;
