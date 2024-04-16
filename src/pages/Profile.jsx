import { useSelector } from "react-redux";
// import Header from "../components/Header";
import UpdateProfileForm from "../components/UpdateProfileForm";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const data = useSelector((state) => state.user.data);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  console.log(data);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
    reset,
  } = useForm({});

  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      Swal.fire({
        title: "Success !",
        text: data.message,
        icon: "success",
      });
      secureLocalStorage.setItem("user", { userId: data.userId, ...data.data });
      navigate("/");
    }

    if (error) {
      Swal.fire({
        title: "Error !",
        text: error,
        icon: "error",
      });
    }
  }, [data, error, navigate]);
  return (
    <div>
      <UpdateProfileForm
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        watch={watch}
        control={control}
        reset={reset}
        setUpdateUserLoading={loading}
      />
    </div>
  );
};

export default Profile;
