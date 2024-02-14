import {useSelector } from "react-redux";
import RegisterForm from "../components/RegisterForm";
import { useEffect,  } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const Register = () => {
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

  // const [inputData, setInputData] = useState({
  //   fullName: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  console.log(errors);
  const navigate = useNavigate();

  // const onSubmit = async (e, data) => {
  //   e.preventDefault();
  //   console.log(data);
  //   dispatch(setRegisterUser(data));
  // };

  useEffect(() => {
    if (data) {
      Swal.fire({
        title: "Success !",
        text: data.message,
        icon: "success",
      });
      navigate("/login");
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
    <RegisterForm
      handleSubmit={handleSubmit}
      // inputData={inputData}
      // setInputData={setInputData}
      register={register}
      errors={errors}
      watch={watch}
      control={control}
      reset={reset}
      setRegisterUserLoading={loading}
    />
  );
};

export default Register;
