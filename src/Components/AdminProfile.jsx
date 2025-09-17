import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminProfile = function () {
  const user = useSelector((state) => state.login.user);
  if (!user) {
    return (
      <Container className="my-5 py-5 text-center">
        <h4>Devi accedere per vedere il profilo.</h4>
      </Container>
    );
  }
  return (
    <>
      <section className="position-fixed start-0 top-0 z-n1 opacity-50 hero-background text-white text-center d-flex flex-column justify-content-center align-items-center"></section>
      <Container className="my-5 py-5">
        <Row className="my-3 py-3">
          <Col xs="auto">
            <Row>
              <h4>Benvenuto Administrator</h4>
              <h3>
                {user.nome} {user.cognome}
              </h3>
              <h6>{user.email}</h6>
            </Row>
            <Row>
              <ul className="list-unstyled">
                <li>
                  <Link className="text-decoration-none text-black fw-bold">
                    Modifica dati profilo
                  </Link>
                </li>
                <li>
                  <Link
                    to="/visualizeusers"
                    className="text-decoration-none text-black fw-bold"
                    onClick={() => {
                      console.log("Click su Visualizza utenti registrati");
                    }}
                  >
                    Visualizza utenti registrati
                  </Link>
                </li>
                <li>
                  <Link
                    to="/backoffice"
                    className="text-decoration-none text-black fw-bold"
                  >
                    Back Office
                  </Link>
                </li>
              </ul>
            </Row>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminProfile;
