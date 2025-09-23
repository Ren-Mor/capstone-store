import { Navbar, Nav, Container, Form, Row, Col, Badge } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import "../App.css";

function MyNav() {
  const CartContent = useSelector((state) => state.cart.content);
  const tokenStatus = useSelector((state) => state.login.token);
  const user = useSelector((state) => state.login.user);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate("/prodotti", { state: { search } });
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
      expand="lg"
      className="bg-body-tertiary mb-3 py-4 px-5 fixed-top"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container fluid>
        <Navbar.Brand href="/" className="me-5 fs-3 fw-bold">
          HW STORE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="d-flex flex-row justify-content-center justify-content-lg-start text-light gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/prodotti"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Sfoglia prodotti
            </NavLink>
          </div>

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
                  <Badge
                    bg="danger"
                    pill
                    className="position-absolute top-10 start-90 translate-middle "
                  >
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
                    <i
                      disabled={!user}
                      onClick={linkToProfile}
                      className="bi bi-person-circle fs-4"
                    ></i>

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
