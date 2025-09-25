import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";

function BackOffice() {
  const token = localStorage.getItem("loginToken");
  const user = JSON.parse(localStorage.getItem("loginUser"));

  const createProductApi = "http://localhost:8080/products";
  const [loading, setLoading] = useState(false);

  async function handleAddProduct(e) {
    e.preventDefault();

    const form = e.target;
    const nome = form.nome.value;
    const descrizione = form.descrizione.value;
    const prezzo = parseFloat(form.prezzo.value);
    const categoria = form.categoria.value;
    const imageFile = form.immagine.files[0];

    const dto = {
      nome,
      descrizione,
      prezzo,
      categoria,
    };

    const formData = new FormData();
    formData.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );
    formData.append("image", imageFile);

    setLoading(true);
    try {
      const fetchHeaders = {
        Authorization: `Bearer ${token}`,
      };
      console.log("FormData inviato:", formData);
      const res = await fetch(createProductApi, {
        method: "POST",
        headers: fetchHeaders,
        body: formData,
      });
      if (res.ok) {
        alert("Prodotto aggiunto con successo");
        window.location.reload();
        await res.json();
        console.log("Token usato (OK):", token);
      } else {
        const errorData = await res.json().catch(() => null);
        alert(
          errorData && errorData.message
            ? `Errore nell'inserimento: ${errorData.message}`
            : "Errore generico nell'inserimento"
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
        <Form onSubmit={handleAddProduct}>
          <Form.Label className="fw-bold">Nome</Form.Label>
          <Form.Control
            name="nome"
            type="text"
            placeholder="Nome"
            style={{ width: "300px" }}
            required
          />
          <Form.Label className="fw-bold">Descrizione</Form.Label>
          <Form.Control
            name="descrizione"
            type="text"
            placeholder="Descrizione"
            style={{ width: "300px" }}
            required
          />
          <Form.Label className="fw-bold">Prezzo</Form.Label>
          <Form.Control
            name="prezzo"
            type="text"
            placeholder="Prezzo"
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
            required
          />
          <Form.Label className="mt-3 fw-bold">Categoria</Form.Label>
          <Form.Select type="select" name="categoria" required>
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
                {loading ? "Aggiunta in corso..." : "Aggiungi Prodotto"}
              </Button>
            </div>
          )}
        </Form>
      </Container>
    </>
  );
}

export default BackOffice;
