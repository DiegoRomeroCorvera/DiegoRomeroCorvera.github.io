import http from "http";
import axios from "axios";
import url from 'url';

const API_KEY = "live_fcuP0ucPKi7QVG3GnauQETmvCHyMMIXjNhWwQy9M3g0Sa1smtyvXzjjaPNXDOQKf";

async function handleGet(req, res) {
  const queryParams = url.parse(req.url, true).query;
  console.log(queryParams.y);

  if (queryParams.y == 1) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("¡Hola, mundo!\n");
    return;
  }
  if (queryParams.y == 2) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("¡Hola, mundo! ¿Cómo estás?\n");
    return;
  }

  console.log("Alguien me mandó una solicitud");
  try {
    const response = await axios.get(
      "https://api.thecatapi.com/v1/images/search?limit=1",
      { headers: { "x-api-key": API_KEY } }
    );
    const gato = response.data[0];
    const gatoJSON = JSON.stringify({ id: gato.id, url: gato.url, width: gato.width, height: gato.height }, null, 2);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Gato del día</title></head>
<body>
  <h2>GATO</h2>
  <img src="${gato.url}" width="300"><br><br>
  <button onclick="votar(1)"> Me gusta</button>
  <button onclick="votar(0)"> No me gusta</button>
  <p id="resultado"></p>
  <h3>JSON</h3>
  <pre>${gatoJSON}</pre>
  <script>
    async function votar(value) {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_id: "${gato.id}", value })
      });
      const data = await res.json();
      document.getElementById("resultado").textContent =
        res.ok ? "¡Voto enviado! " + JSON.stringify(data) : "Error: " + data.error;
    }
  </script>
</body>
</html>`);
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Error al obtener gato" }));
  }
}

async function handlePost(req, res) {
  let body = "";
  req.on("data", chunk => { body += chunk.toString(); });
  req.on("end", async () => {
    try {
      const datos = JSON.parse(body);
      const response = await axios.post(
        "https://api.thecatapi.com/v1/votes",
        { image_id: datos.image_id, value: datos.value },
        { headers: { "Content-Type": "application/json", "x-api-key": API_KEY } }
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response.data));
    } catch (error) {
      console.error("Error POST:", error.response?.data || error.message);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Error al votar" }));
    }
  });
}

const servidor = http.createServer((req, res) => {
  if (req.method === "GET")       handleGet(req, res);
  else if (req.method === "POST") handlePost(req, res);
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Ruta no encontrada");
  }
});

const puerto = 1985;
servidor.listen(puerto, () => console.log(`Servidor escuchando en el puerto ${puerto}`));
