// Módulo nativo de Node.js para crear servidores HTTP y manejar peticiones y respuestas web
import http from 'http';
// Módulo nativo de Node.js para leer y escribir archivos del sistema de archivos
import fs from 'fs';

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


    //Esta función deberá mostrar deberá mostrar una página HTML 
    //con la bienvenida a tu proyecto
    function darBienvenida(req, res) {
      //Agrega lo mínimo necesario en bienvenida.html
      fs.readFile('bienvenida.html', 'utf8', (error, data) => {
        if (error) {
           // 500: Error interno del servidor, algo falló al intentar leer el archivo
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Oh no!!!!');
          return;
        }
        // 200: Solicitud exitosa, se encontró y se enviará el archivo correctamente
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
    }


    //Esta función deberá enviar un json con los datos de los usuarios
    function getUsuarios(req, res) {
        //Esto representa un objeto JSON de un usuario
        const usuarios = [
            { "nombre": "Punk", "saldo": "0" },
            { "nombre": "Diego", "saldo": "500" },
        ];
      res.writeHead(200, { 'Content-Type': 'application/json' });

      // stringify convierte el objeto JS a texto JSON para poder enviarlo por HTTP, ya que res.end solo acepta strings o buffers
      res.end(JSON.stringify(usuarios));
    }

  
    function mostrarPerfil(req, res) {
        fs.readFile('perfil.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }

     
      function mostrarMovimientos(req, res) {
        //Construye una página básica movimientos.html
        fs.readFile('movimientos.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }

    //Esta función deberá enviar un json con los datos de los movimientos
    function getMovimientos(req, res) {
        const movimientos = [
            { "tipo": "Depósito", "monto": 500 },
            { "tipo": "Retiro", "monto": 100 },
            { "tipo": "Transferencia", "monto": 200 },
        ];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(movimientos));
    }

    function manejarRuta404(req, res) {                                                                                                                                                                      
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('¡Uy! Te perdiste... esta página no existe. 404 🚧');
    }

    function mostrarUsuarios(req, res) {
        fs.readFile('usuarios.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }

    function mostrarEquipo(req, res) {
        fs.readFile('equipo.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }

    function mostrarOpinion(req, res) {
        fs.readFile('opinion.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }

    // === ENDPOINT PROPIO: tasas de cambio de divisas ===
    function getTasas(req, res) {
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
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tasas));
    }

    // === ENDPOINT PROPIO: número de la suerte del día ===
    function getSuerte(req, res) {
        const mensajes = [
            "Hoy es un buen día para ahorrar.",
            "Tu próxima inversión será la correcta.",
            "El dinero llega a quienes planifican.",
            "Evita gastos innecesarios hoy.",
            "Una oportunidad financiera se acerca."
        ];
        const numero = Math.floor(Math.random() * 100) + 1;
        const mensaje = mensajes[Math.floor(Math.random() * mensajes.length)];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ "numero_de_la_suerte": numero, "consejo": mensaje }));
    }

    // === ENDPOINTS DE COMPAÑEROS ===
    function getClima(req, res) {
        const condiciones = ["Soleado", "Nublado", "Lluvioso", "Parcialmente nublado", "Ventoso"];
        const ciudades = ["CDMX", "Guadalajara", "Monterrey", "Puebla", "Querétaro"];
        const clima = {
            "ciudad": ciudades[Math.floor(Math.random() * ciudades.length)],
            "temperatura_c": Math.floor(Math.random() * 20) + 15,
            "condicion": condiciones[Math.floor(Math.random() * condiciones.length)],
            "humedad_pct": Math.floor(Math.random() * 60) + 30
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(clima));
    }

    function getChiste(req, res) {
        const chistes = [
            "¿Por qué el dinero no puede tener amigos? Porque siempre se va.",
            "¿Cuál es el banco más frío? ¡El banco de hielo!",
            "Le pregunté a mi billetera si estaba bien. Me respondió: 'Vacía de contenido, llena de deudas.'",
            "¿Por qué el contador se durmió? Porque los números lo aburren.",
            "Mi tarjeta de crédito y yo tenemos una relación: ella manda y yo pago."
        ];
        const chiste = chistes[Math.floor(Math.random() * chistes.length)];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ "chiste": chiste }));
    }

    function getReceta(req, res) {
        const recetas = [
            { "nombre": "Tacos de canasta", "tiempo_min": 20, "dificultad": "Fácil" },
            { "nombre": "Chilaquiles verdes", "tiempo_min": 30, "dificultad": "Media" },
            { "nombre": "Quesadillas de flor de calabaza", "tiempo_min": 15, "dificultad": "Fácil" },
            { "nombre": "Pozole rojo", "tiempo_min": 90, "dificultad": "Difícil" },
            { "nombre": "Enchiladas suizas", "tiempo_min": 40, "dificultad": "Media" }
        ];
        const receta = recetas[Math.floor(Math.random() * recetas.length)];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ "receta_del_dia": receta }));
    }

    function getHoroscopo(req, res) {
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
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ "signo": signo, "prediccion": prediccion }));
    }

    // Crea el servidor HTTP que escucha y responde peticiones según la URL
    // Documentación: https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
    const servidor = http.createServer((req, res) => {
      const url = req.url;

      if (url === '/') {
        darBienvenida(req, res);
      } else if (url === '/api/usuarios') {
        getUsuarios(req, res);
      } else if (url === '/api/movimientos') {
        getMovimientos(req, res);
      } 
      else if (url === '/perfil') {
        mostrarPerfil(req, res);
      }
      else if (url === '/usuarios') {
        mostrarUsuarios(req, res);
      } 
      else if (url === '/movimientos') {
        mostrarMovimientos(req, res);
      }                                                                                                                                                                             
      else if (url === '/equipo') {
        mostrarEquipo(req, res);
      }
      else if (url === '/opinion') {
        mostrarOpinion(req, res);
      }
      else if (url === '/api/tasas') {
        getTasas(req, res);
      }
      else if (url === '/api/suerte') {
        getSuerte(req, res);
      }
      else if (url === '/api/clima') {
        getClima(req, res);
      }
      else if (url === '/api/chiste') {
        getChiste(req, res);
      }
      else if (url === '/api/receta') {
        getReceta(req, res);
      }
      else if (url === '/api/horoscopo') {
        getHoroscopo(req, res);
      }
      else {
        manejarRuta404(req, res);
      }
    });

    const puerto = 9300;
    servidor.listen(puerto, () => {
      console.log(`Servidor escuchando en el puerto ${puerto}`);
    });

    //Importante
    //En esta actividad deberás agregar en miarchivo.html un enlace a servidor.js y al resto de los html