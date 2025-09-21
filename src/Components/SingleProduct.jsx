import { Button, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import "../style/SingleProduct.css";

const SingleProduct = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addToCartRedux = () => {
    dispatch({ type: "ADD_TO_CART", payload: data });
  };

  const token = localStorage.getItem("loginToken");
  const user = JSON.parse(localStorage.getItem("loginUser"));
  const eliminaProdotto = async (id) => {
    const deleteApi = `http://localhost:8080/products/${id}`;
    const choice = window.confirm("Confermi l'eliminazione del prodotto?");
    if (!choice) return;

    try {
      const res = await fetch(deleteApi, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        alert("Eliminazione avvenuta con successo");
        await res.json();
      } else {
        const errorData = await res.json().catch(() => null);
        alert(
          errorData && errorData.message
            ? `Errore nell'eliminazione: ${errorData.message}`
            : "Errore nell'eliminazione"
        );
      }
    } catch (error) {
      console.log("Errore di rete: " + error.message);
    }
  };

  return (
    <Col key={data.id}>
      <Card className="product-card mb-2 bg-light rounded-2 p-3 shadow border-0">
        <img
          className="w-100 "
          style={{ height: "190px", objectFit: "contain" }}
          src={data.immagine}
          alt="immagine"
          onClick={() => {
            navigate("/details/" + data.id, { state: { data } });
          }}
        />
        <p className="text-truncate">{data.nome}</p>
        <p>{data.prezzo} €</p>
        <Button
          onClick={addToCartRedux}
          variant="light"
          className="w-100 rounded-2 border-0 text-white fw-bold cart-button"
        >
          Aggiungi al carrello
        </Button>
        {user && user.ruolo === "ADMIN" && (
          <div className="d-flex gap-2 justify-content-center mt-3">
            <Button
              onClick={() => {
                navigate("/updateproduct", { state: { data } });
              }}
              variant="dark"
              className="w-100"
            >
              Modifica
            </Button>
            <Button
              className="w-100"
              variant="dark"
              onClick={() => {
                eliminaProdotto(data.id);
              }}
            >
              Elimina
            </Button>
          </div>
        )}
      </Card>
    </Col>
  );
};

export default SingleProduct;
