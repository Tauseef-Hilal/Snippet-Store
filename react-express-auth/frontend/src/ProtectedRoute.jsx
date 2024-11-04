import { Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import PropTypes from "prop-types";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
