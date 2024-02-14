import { useDispatch, useSelector } from "react-redux";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setForgotPassword } from "../features/userSlice";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const data = useSelector((state) => state.user.data);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setForgotPassword(inputData));
  };

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
    <ForgotPasswordForm
      handleSubmit={handleSubmit}
      inputData={inputData}
      setInputData={setInputData}
      setForgotPasswordLoading={loading}
    />
  );
};

export default ForgotPassword;
