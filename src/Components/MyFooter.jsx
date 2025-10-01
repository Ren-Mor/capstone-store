import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function MyFooter() {
  return (
    <footer className="d-flex bg-dark fixed-bottom py-3 mb-0 vh-10">
      <div className="text-center text-white m-auto p-2 fs-5">
        <strong> HW STORE </strong>{" "}
        <div className="d-inline-block text-center text-nowrap fs-6">
          - Morelli Renato 2025 -
        </div>
        <div className="d-inline-block text-center text-nowrap ms-3 fs-6">
          La nostra mail: renatomorelli@hotmail.it -
        </div>
        <div className="d-inline-block text-center text-nowrap ms-3 fs-6">
          Messaggiaci su Whatsapp: unNumeroDiTelefono
        </div>
      </div>
    </footer>
  );
}

export default MyFooter;
