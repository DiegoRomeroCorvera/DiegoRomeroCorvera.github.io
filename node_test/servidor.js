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

const API_KEY = 'Ucq0jpATIciqEgt7y1KusUJfAvZJ4y9ol7i2MrvX';

async function fetchClimaGet() {
  try {
    const url = 'https://api.api-ninjas.com/v1/weather?lat=20.6597&lon=-103.3496';
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'X-Api-Key': API_KEY }
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const data = await response.json();
    console.log('\n[GET] Clima en Guadalajara (API Ninjas):');
    console.log(data);
  } catch (err) {
    console.error('Error en GET:', err.message);
  }
}

async function fetchPost() {
  try {
    const response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'X-Api-Key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ciudad: 'Guadalajara', mensaje: 'prueba POST' })
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const data = await response.json();
    console.log('\n[POST] httpbin confirmó que recibió estos headers:');
    console.log({ 'X-Api-Key': data.headers['X-Api-Key'] });
    console.log('Body enviado:', data.json);
  } catch (err) {
    console.error('Error en POST:', err.message);
  }
}

fetchClimaGet();
fetchPost();