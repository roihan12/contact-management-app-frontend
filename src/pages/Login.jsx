import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../components/LoginForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLoginUser } from "../features/userSlice";
import secureLocalStorage from "react-secure-storage";
import Swal from "sweetalert2";

const Login = () => {
  const data = useSelector((state) => state.user.data);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoginUser(inputData));
  };

  useEffect(() => {
    if (data) {
      console.log(data.refreshToken);
      secureLocalStorage.setItem("accessToken", data.accessToken);
      secureLocalStorage.setItem("refreshToken", data.refreshToken);
      secureLocalStorage.setItem("user", data.data);
      navigate("/");
    }

    if (error) {
      Swal.fire({
        title: "Error !",
        text: error,
        icon: "error",
      })
    }
  }, [data, error, navigate]);

  return (
    <section>
      <LoginForm
        handleSubmit={handleSubmit}
        inputData={inputData}
        setInputData={setInputData}
        setLoginUserLoading={loading}
      />
    </section>
  );
};

export default Login;
