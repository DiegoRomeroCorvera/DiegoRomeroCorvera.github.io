import http from 'http';

const servidor = http.createServer((req, res) => {
  console.log("Alguien me mandó una solicitud");
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Quiero la libertad de esculpir y cincelar mi propio rostro, de detener la hemorragia con cenizas, de crear mis propios dioses a partir de mis entrañas...\n');
  fetchArtistBio('Shakira');
});

const puerto = 1984;

servidor.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});

async function fetchArtistBio(artist) {
  try {
    const title = encodeURIComponent(artist);
    const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${title}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const data = await response.json();
    console.log(`\nBiografía de ${artist}:`);
    console.log(data.extract || 'No se encontró una biografía resumida.');
  } catch (err) {
    console.error('Error al obtener la biografía:', err.message);
  }
}

// Llamada de ejemplo para un artista musical — cambia el nombre por cualquier cantante o grupo.
fetchArtistBio('Shakira');