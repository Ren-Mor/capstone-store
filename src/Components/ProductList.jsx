import { Col, Row, Container } from "react-bootstrap";
import SingleProduct from "./SingleProduct";
import { useLocation } from "react-router-dom";

function ProductList({ categoria }) {
  const location = useLocation();
  const searchQuery = location.state?.search || "";
  let filteredProducts = Array.isArray(categoria) ? categoria : [];
  if (searchQuery) {
    filteredProducts = filteredProducts.filter((product) =>
      product.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  return (
    <>
      <section className="position-fixed start-0 top-0 z-n1 opacity-50 hero-background text-white text-center d-flex flex-column justify-content-center align-items-center"></section>
      <Container className="py-3 my-5">
        <Row className="d-flex row-cols-1 row-cols-md-2 row-cols-lg-5 g-3 my-5 py-5">
          {filteredProducts.map((product) => (
            <Col key={product.id}>
              <SingleProduct data={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default ProductList;
