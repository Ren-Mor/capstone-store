import { Navbar, Nav, Container, Form, Row, Col, Badge } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import "../App.css";

function MyNav() {
  const CartContent = useSelector((state) => state.cart.cart.content);
  const tokenStatus = useSelector((state) => state.user.login.token);
  const user = useSelector((state) => state.user.login);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate("/prodotti/all", { state: { search } });
    }
  };
  const linkToProfile = () => {
    if (user.ruolo === "ADMIN") {
      navigate("/adminprofile");
    } else {
      navigate("/userprofile");
    }
  };
  return (
    <Navbar
      expand="xl"
      className="bg-body-tertiary mb-3 py-4 px-5 fixed-top text-nowrap"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="me-5 fs-3 fw-bold">
          HW STORE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="gap-2 mx-2">
            <NavLink to="/prodotti/cpu" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Processori
            </NavLink>
            <NavLink to="/prodotti/gpu" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Schede grafiche
            </NavLink>
            <NavLink to="/prodotti/psu" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Alimentatori
            </NavLink>
            <NavLink to="/prodotti/ram" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Memorie
            </NavLink>
            <NavLink to="/prodotti/mb" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Schede madri
            </NavLink>
            <NavLink to="/prodotti/case" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Case
            </NavLink>
          </Nav>

          <Form
            className="d-flex ms-auto me-3 mb-3 mb-lg-0 mt-3 mt-lg-0 justify-content-center"
            onSubmit={handleSearchSubmit}
          >
            <Form.Control
              type="search"
              placeholder="Cerca..."
              className="rounded-pill mw-300"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>

          <Row>
            <Col className="d-flex justify-content-center align-items-center">
              <Nav className="d-flex flex-row gap-4 align-items-center">
                <NavLink to="/cart" className="position-relative">
                  <i className="bi bi-cart-fill fs-4"></i>
                  <Badge bg="danger" pill className="position-absolute top-10 start-90 translate-middle ">
                    {CartContent.length}
                  </Badge>
                </NavLink>
                {tokenStatus === null ? (
                  <NavLink to="/signin" className="text-decoration-none">
                    <i className="bi bi-person-circle fs-4"></i>
                    <span className="text-white access ms-2">Accedi</span>
                  </NavLink>
                ) : (
                  <Nav className="d-flex align-items-center text-decoration-none">
                    <i disabled={!user} onClick={linkToProfile} className="bi bi-person-circle fs-4"></i>

                    <Link className="text-decoration-none" to="/confirm-logout">
                      <span className="text-white access ms-2">Log out</span>
                    </Link>
                  </Nav>
                )}
              </Nav>
            </Col>
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav;
