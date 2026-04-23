// Módulo nativo de Node.js para crear servidores HTTP y manejar peticiones y respuestas web
import http from 'http';
// Módulo nativo de Node.js para leer y escribir archivos del sistema de archivos
import fs from 'fs';


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