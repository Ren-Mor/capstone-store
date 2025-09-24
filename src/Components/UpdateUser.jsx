import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";

function UpdateUser() {
  const UpdateApi = "http://localhost:8080/utenti/me";
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("loginUser"));
  const token = localStorage.getItem("loginToken");

  async function handleSignup(e) {
    e.preventDefault();
    const formData = e.target.elements;
    const nome = formData.nome.value;
    const cognome = formData.cognome.value;
    const email = formData.email.value;
    const password = formData.password.value;
    const confirmPassword = formData["confirm-password"].value;
    const updatedUser = { nome, cognome, email, password };

    if (password !== confirmPassword) {
      alert("Le password non coincidono.");
      return;
    }
    console.log("FormData inviato:", token);
    setLoading(true);
    try {
      const res = await fetch(UpdateApi, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome, cognome, email, password }),
      });
      if (res.ok) {
        alert("Dati cambiati con successo");
        dispatch({ type: "SET_USER", payload: updatedUser });
        await res.json();
      } else {
        const errorData = await res.json().catch(() => null);
        alert(
          errorData && errorData.message
            ? `Errore nella registrazione: ${errorData.message}`
            : "Errore nella registrazione"
        );
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
        <Form onSubmit={handleSignup}>
          <Form.Label className="fw-bold">Nome</Form.Label>
          <Form.Control
            name="nome"
            type="text"
            placeholder="Nome"
            defaultValue={userData.nome}
            style={{ width: "300px" }}
            required
          />
          <Form.Label className="fw-bold">Cognome</Form.Label>
          <Form.Control
            name="cognome"
            type="text"
            placeholder="Cognome"
            defaultValue={userData.cognome}
            style={{ width: "300px" }}
            required
          />
          <Form.Label className="fw-bold">Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Email"
            defaultValue={userData.email}
            style={{ width: "300px" }}
            required
          />
          <Form.Label className="mt-3 fw-bold">Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <Form.Control
            name="confirm-password"
            type="password"
            placeholder="Password"
            className="mt-3"
            required
          />
          <div className="d-flex">
            <Button
              variant="danger"
              type="submit"
              className="w-100 mt-4 mx-auto"
              disabled={loading}
            >
              {loading ? "Aggiornamento dati..." : "Aggiorna"}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default UpdateUser;
