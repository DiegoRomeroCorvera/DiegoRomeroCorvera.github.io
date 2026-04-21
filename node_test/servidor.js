import http from "http";
import axios from "axios";

const API_KEY = "live_fcuP0ucPKi7QVG3GnauQETmvCHyMMIXjNhWwQy9M3g0Sa1smtyvXzjjaPNXDOQKf";
const servidor = http.createServer(async (req, res) => { 
  console.log("ALGUIEN ENVIO UNA SOLICITUD");
  try {
    const response = await axios.get(
      "https://api.thecatapi.com/v1/images/search?limit=1",
      {
        headers: {
          "x-api-key": API_KEY
        }
      }
    );

    const gato = response.data[0]; 

    res.writeHead(200, { "Content-Type": "text/html" }); 
    res.end(`
      <h2>GATO</h2>
      <img src="${gato.url}" width="300">
    `);
  } catch (error) { 
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Error al obtener gato" }));
  }

  if (req.method === "POST") { 
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const datos = JSON.parse(body);

        const response = await axios.post(
           "https://api.thecatapi.com/v1/votes",
          {
            image_id: datos.image_id,
            value: datos.value
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": API_KEY
            }
          }
        );

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(response.data));
      } catch (error) {
        console.error("Error POST:", error.response?.data || error.message);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Error al votar" }));
      }
    });

    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Ruta no encontrada");
});

const puerto = 1985;

servidor.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});