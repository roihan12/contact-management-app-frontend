import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
const ProtectedRoute = ({
  user,
  redirectPath = "/login",
  refreshExpiretion,
  children,
}) => {
  if (!user && refreshExpiretion <= new Date()) {
    return <Navigate to={redirectPath} replace />;
  }

  //   return <Outlet />;
  return children;
};

ProtectedRoute.propTypes = {
  redirectPath: PropTypes.string,
  user: PropTypes.object,
  refreshExpiretion: PropTypes.instanceOf(Date).isRequired,
  children: PropTypes.any,
};
export default ProtectedRoute;
