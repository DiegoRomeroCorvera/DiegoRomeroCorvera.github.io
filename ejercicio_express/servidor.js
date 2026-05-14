import mysql from 'mysql';

const connection = mysql.createConnection({
  host: "localhost",
  user: "test2",
  password: "test2",
  database: "test2"
});

connection.connect(error => {
  if (error) throw error;
  console.log("Conectada");
});
