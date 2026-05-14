// Express simplifica mucho la creación de servidores: cada ruta tiene su
// propia línea en vez de un if/else gigante dentro de createServer.
import express from 'express';
import mysql from 'mysql2';

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Con una sola línea Express parsea el body JSON de cualquier POST;
// con http nativo había que acumular chunks manualmente con req.on("data").
app.use(express.json());

const connection = mysql.createConnection({
  host: "mysql-31efc894-tec-f26e.e.aivencloud.com",
  port: 20902,
  user: "avnadmin",
  password: "AVNS_GJwkU29Bq2KswwA_MOt",
  database: "defaultdb"
});

connection.connect(error => {
  if (error) throw error;
  console.log("Conectada");
});

const crearTablaSQL = `
  CREATE TABLE IF NOT EXISTS donantes (
      id INT PRIMARY KEY AUTO_INCREMENT,
      nombre VARCHAR(255) NOT NULL
  );
`;

const insertarDonanteSQL = `
  INSERT INTO donantes (nombre) VALUES ('Donante Anónimo');
`;

const consultaSQL = `
  SELECT * FROM donantes;
`;


connection.query(crearTablaSQL, (error, resultados) => {
    if (error) throw error;
    //res.json(resultados);
    console.log(resultados);
    connection.end();
});
connection.query(insertarDonanteSQL, (error, resultados) => {
    if (error) throw error;
    //res.json(resultados);
    console.log(resultados);
    connection.end();
});
connection.query(consultaSQL, (error, resultados) => {
    if (error) throw error;
    //res.json(resultados);
    console.log(resultados);
    connection.end();
});


/*
 * ============================================================
 *  LISTA DE ENDPOINTS DISPONIBLES
 * ============================================================
 *
 *  PÁGINAS HTML
 *  GET /              → Bienvenida
 *  GET /perfil        → Perfil de usuario
 *  GET /usuarios      → Lista de usuarios
 *  GET /movimientos   → Movimientos de cuenta
 *  GET /equipo        → Equipo de trabajo
 *  GET /opinion       → Opinión / comentarios
 *
 *  API — datos JSON
 *  GET /api/usuarios      → Arreglo de usuarios
 *  GET /api/movimientos   → Arreglo de movimientos
 *
 *  ENDPOINTS PROPIOS
 *  GET /api/tasas   → Tasas de cambio de divisas (base MXN)
 *  GET /api/suerte  → Número de la suerte + consejo financiero
 *
 *  ENDPOINTS DE COMPAÑEROS
 *  GET /api/clima      → Clima simulado del día
 *  GET /api/chiste     → Chiste aleatorio
 *  GET /api/receta     → Receta sugerida del día
 *  GET /api/horoscopo  → Horóscopo financiero del día
 * ============================================================
 */

// ── Páginas HTML ──────────────────────────────────────────────────────────────
// res.sendFile reemplaza las 8 líneas de fs.readFile + writeHead + end
// que se repetían en cada función del servidor original.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'bienvenida.html'));
});

app.get('/perfil', (req, res) => {
    res.sendFile(path.join(__dirname, 'perfil.html'));
});

app.get('/usuarios', (req, res) => {
    res.sendFile(path.join(__dirname, 'usuarios.html'));
});

app.get('/movimientos', (req, res) => {
    res.sendFile(path.join(__dirname, 'movimientos.html'));
});

app.get('/equipo', (req, res) => {
    res.sendFile(path.join(__dirname, 'equipo.html'));
});

app.get('/opinion', (req, res) => {
    res.sendFile(path.join(__dirname, 'opinion.html'));
});

// ── API datos JSON ────────────────────────────────────────────────────────────
// res.json() hace el JSON.stringify y pone el Content-Type automáticamente;
// ya no hay que escribir esas dos líneas en cada endpoint.
app.get('/api/usuarios', (req, res) => {
    const usuarios = [
        { "nombre": "Punk", "saldo": "0" },
        { "nombre": "Diego", "saldo": "500" },
    ];
    res.json(usuarios);
});

app.get('/api/movimientos', (req, res) => {
    const movimientos = [
        { "tipo": "Depósito", "monto": 500 },
        { "tipo": "Retiro", "monto": 100 },
        { "tipo": "Transferencia", "monto": 200 },
    ];
    res.json(movimientos);
});

// ── Endpoints propios ─────────────────────────────────────────────────────────
// Endpoint propio: tasas de cambio de divisas
app.get('/api/tasas', (req, res) => {
    const tasas = {
        "fecha": new Date().toLocaleDateString('es-MX'),
        "base": "MXN",
        "tasas": {
            "USD": 0.049,
            "EUR": 0.045,
            "BTC": 0.0000008,
            "CAD": 0.067
        }
    };
    res.json(tasas);
});

// Endpoint propio: número de la suerte del día
app.get('/api/suerte', (req, res) => {
    const mensajes = [
        "Hoy es un buen día para ahorrar.",
        "Tu próxima inversión será la correcta.",
        "El dinero llega a quienes planifican.",
        "Evita gastos innecesarios hoy.",
        "Una oportunidad financiera se acerca."
    ];
    const numero = Math.floor(Math.random() * 100) + 1;
    const mensaje = mensajes[Math.floor(Math.random() * mensajes.length)];
    res.json({ "numero_de_la_suerte": numero, "consejo": mensaje });
});

// ── Endpoints de compañeros ───────────────────────────────────────────────────
app.get('/api/clima', (req, res) => {
    const condiciones = ["Soleado", "Nublado", "Lluvioso", "Parcialmente nublado", "Ventoso"];
    const ciudades = ["CDMX", "Guadalajara", "Monterrey", "Puebla", "Querétaro"];
    const clima = {
        "ciudad": ciudades[Math.floor(Math.random() * ciudades.length)],
        "temperatura_c": Math.floor(Math.random() * 20) + 15,
        "condicion": condiciones[Math.floor(Math.random() * condiciones.length)],
        "humedad_pct": Math.floor(Math.random() * 60) + 30
    };
    res.json(clima);
});

app.get('/api/chiste', (req, res) => {
    const chistes = [
        "¿Por qué el dinero no puede tener amigos? Porque siempre se va.",
        "¿Cuál es el banco más frío? ¡El banco de hielo!",
        "Le pregunté a mi billetera si estaba bien. Me respondió: 'Vacía de contenido, llena de deudas.'",
        "¿Por qué el contador se durmió? Porque los números lo aburren.",
        "Mi tarjeta de crédito y yo tenemos una relación: ella manda y yo pago."
    ];
    const chiste = chistes[Math.floor(Math.random() * chistes.length)];
    res.json({ "chiste": chiste });
});

app.get('/api/receta', (req, res) => {
    const recetas = [
        { "nombre": "Tacos de canasta", "tiempo_min": 20, "dificultad": "Fácil" },
        { "nombre": "Chilaquiles verdes", "tiempo_min": 30, "dificultad": "Media" },
        { "nombre": "Quesadillas de flor de calabaza", "tiempo_min": 15, "dificultad": "Fácil" },
        { "nombre": "Pozole rojo", "tiempo_min": 90, "dificultad": "Difícil" },
        { "nombre": "Enchiladas suizas", "tiempo_min": 40, "dificultad": "Media" }
    ];
    const receta = recetas[Math.floor(Math.random() * recetas.length)];
    res.json({ "receta_del_dia": receta });
});

app.get('/api/horoscopo', (req, res) => {
    const signos = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo",
                    "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
    const predicciones = [
        "Las estrellas favorecen una inversión esta semana.",
        "Evita gastos impulsivos, viene una sorpresa económica.",
        "Buen momento para saldar deudas pendientes.",
        "Una oportunidad de negocio llamará a tu puerta.",
        "Cuida tu presupuesto, los astros advierten gastos inesperados."
    ];
    const signo = signos[Math.floor(Math.random() * signos.length)];
    const prediccion = predicciones[Math.floor(Math.random() * predicciones.length)];
    res.json({ "signo": signo, "prediccion": prediccion });
});

// El 404 en Express es un middleware al final del archivo; no hay que revisar
// req.url manualmente: si ninguna ruta coincide, la petición llega aquí.
app.use((req, res) => {
    res.status(404).send('¡Uy! Te perdiste... esta página no existe. 404 🚧');
});

const puerto = 9300;
app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`);
});
