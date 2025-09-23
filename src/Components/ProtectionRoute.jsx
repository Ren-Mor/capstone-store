import { Navigate } from "react-router-dom";

function ProtectionRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("loginUser"));

  if (!user || user.ruolo !== "ADMIN") {
    return <Navigate to="/youbetterrun" replace />;
  }
  return children;
}

export default ProtectionRoute;
