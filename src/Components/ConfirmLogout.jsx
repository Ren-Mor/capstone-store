import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

function ConfirmLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("loginToken");
    localStorage.removeItem("loginUser");
    navigate("/");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "60vh" }}
    >
      <section className="position-fixed start-0 top-0 z-n1 opacity-50 hero-background text-white text-center d-flex flex-column justify-content-center align-items-center"></section>
      <h2>Sei sicuro di voler uscire?</h2>
      <div className="mt-5 d-flex gap-4">
        <Button variant="danger" onClick={handleConfirm}>
          Conferma
        </Button>
        <Button variant="dark" onClick={handleCancel}>
          Annulla
        </Button>
      </div>
    </div>
  );
}

export default ConfirmLogout;
