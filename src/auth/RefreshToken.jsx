import axios from "axios";
import { jwtDecode } from "jwt-decode";
import secureLocalStorage from "react-secure-storage";

const RefreshToken = async () => {
  const auth = secureLocalStorage.getItem("accessToken");
  const refresh = secureLocalStorage.getItem("refreshToken");

  if (!auth || !refresh) {
    return false;
  }

  const exp = new Date(jwtDecode(auth).exp * 1000);

  console.log("run before refresh condition..");

  if (exp <= new Date()) {
    console.log("run after refresh condition..");
    try {
      const response = await axios.get("/api/auth/refresh", {
        headers: {
          Authorization: `Bearer ${refresh}`,
        },
      });

      if (!response.data) {
        return false;
      }
      secureLocalStorage.setItem("accessToken", response.data.accessToken);
      secureLocalStorage.setItem("refreshToken", response.data.refreshToken);
      secureLocalStorage.setItem("user", response.data.data);
      return true;
    } catch (error) {
        return false
    }
  }
};

export default RefreshToken;
