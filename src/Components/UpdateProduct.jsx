import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function UpdateProduct() {
  const location = useLocation();
  const data = location.state?.data;

  const token = localStorage.getItem("loginToken");
  const user = JSON.parse(localStorage.getItem("loginUser"));

  const updateApi = `http://localhost:8080/products/data/${data.id}`;
  const [loading, setLoading] = useState(false);

  function updateImage(e) {
    const form = e.target;
    const imageFile = form.immagine.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    if (!imageFile) return;
    fetch(`http://localhost:8080/products/image/${data.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  async function handleUpdateProduct(e) {
    e.preventDefault();
    console.log(data.id);

    const form = e.target;
    const nome = form.nome.value;
    const descrizione = form.descrizione.value;
    const prezzo = parseFloat(form.prezzo.value);
    const categoria = form.categoria.value;

    const dto = {
      nome,
      descrizione,
      prezzo,
      categoria,
    };

    console.log(typeof dto);

    setLoading(true);
    try {
      console.log("FormData inviato:", dto);
      const res = await fetch(updateApi, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dto),
      });
      if (res.ok) {
        alert("Prodotto aggiornato con successo");
        updateImage(e);
        window.location.reload();
        await res.json();
        console.log("Token usato (OK):", token);
      } else {
        const errorData = await res.json().catch(() => null);
        alert(
          errorData && errorData.message
            ? `Errore nell'aggiornamento: ${errorData.message}`
            : "Errore generico nell'aggiornamento"
        );
        console.log("Token usato (Errore):", token);
      }
    } catch (error) {
      alert("Errore di rete: " + error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <section className="position-fixed start-0 top-0 z-n1 opacity-50 hero-background text-white text-center d-flex flex-column justify-content-center align-items-center"></section>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Form onSubmit={handleUpdateProduct}>
          <Form.Label className="fw-bold">Nome</Form.Label>
          <Form.Control
            name="nome"
            type="text"
            placeholder="Nome"
            defaultValue={data?.nome || ""}
            style={{ width: "300px" }}
            required
          />
          <Form.Label className="fw-bold">Descrizione</Form.Label>
          <Form.Control
            name="descrizione"
            type="text"
            placeholder="Descrizione"
            defaultValue={data?.descrizione || ""}
            style={{ width: "300px" }}
            required
          />
          <Form.Label className="fw-bold">Prezzo</Form.Label>
          <Form.Control
            name="prezzo"
            type="text"
            placeholder="Prezzo"
            defaultValue={data?.prezzo || ""}
            style={{ width: "300px" }}
            required
          />
          <Form.Label className="fw-bold">Immagine</Form.Label>
          <Form.Control
            name="immagine"
            type="file"
            accept="image/*"
            placeholder="Immagine"
            style={{ width: "300px" }}
          />
          <Form.Label className="mt-3 fw-bold">Categoria</Form.Label>
          <Form.Select
            type="select"
            defaultValue={data?.categoria}
            name="categoria"
            required
          >
            <option value="" disabled selected>
              Seleziona categoria
            </option>
            <option value="CPU">Processore</option>
            <option value="GPU">Scheda grafica</option>
            <option value="RAM">RAM</option>
            <option value="MOTHERBOARD">Scheda madre</option>
            <option value="POWER_SUPPLY">Alimentatore</option>
            <option value="CASE">Case</option>
          </Form.Select>
          {user.ruolo === "ADMIN" && (
            <div className="d-flex">
              <Button
                disabled={loading}
                variant="danger"
                type="submit"
                className="w-100 mt-4 mx-auto"
                required
              >
                {loading ? "Modifica in corso..." : "Modifica Prodotto"}
              </Button>
            </div>
          )}
        </Form>
      </Container>
    </>
  );
}

export default UpdateProduct;
