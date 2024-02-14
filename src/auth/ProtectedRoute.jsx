import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
const ProtectedRoute = ({ user, redirectPath = "/login" }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  redirectPath: PropTypes.string,
  user: PropTypes.object.isRequired,
};
export default ProtectedRoute;
