import { useEffect, useState } from "react";
import { Container, Table, Spinner, Alert } from "react-bootstrap";

function VisualizeUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("loginToken");
  const usersApi = "http://localhost:8080/utenti?page=0&size=10";

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(usersApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setUsers(data);
          } else if (data && Array.isArray(data.content)) {
            setUsers(data.content);
          } else {
            setUsers([]);
          }
        } else {
          const errorData = await res.json().catch(() => null);
          const errorMsg =
            errorData && errorData.message
              ? errorData.message
              : "Errore nel recupero utenti";
          setError(errorMsg);
          alert(errorMsg);
        }
      })
      .catch((err) => {
        setError("Errore di rete: " + err.message);
        alert("Errore di rete: " + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  return (
    <>
      <section className="position-fixed start-0 top-0 z-n1 opacity-50 hero-background text-white text-center d-flex flex-column justify-content-center align-items-center"></section>
      <section className="my-5 py-5 container-fluid">
        <Container className="my-5 py-5 w-50 rounded-3 bg-dark text-white shadow-lg">
          <h5 className="mb-3">Utenti registrati</h5>
          {loading && <Spinner animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}
          {!loading && !error && (
            <Table striped hover variant="dark">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Cognome</th>
                  <th>Email</th>
                  <th>Ruolo</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.nome}</td>
                    <td>{u.cognome}</td>
                    <td>{u.email}</td>
                    <td>{u.ruolo}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Container>
      </section>
    </>
  );
}

export default VisualizeUsers;
