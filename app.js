  const express = require('express');
  const app = express();
  const port = 3000;
  const cors = require('cors');
  const mysql = require('mysql2');
  const admin = require('firebase-admin');
  const serviceAccount = require('./firebase/bd-harrybooks-firebase-adminsdk-2y5fa-45b36b1738.json');


  app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:'https://bd-harrybooks-default-rtdb.firebaseio.com/'
})

app.use(cors({
  origin: 'http://localhost:5173' 
}));

  // const db = mysql.createConnection({
  //   host: 'localhost',
  //   user: 'root',
  //   password: '',
  //   database: 'libreria'
  // });


  app.get('/harryBooks', async (req, res) => {
    try {
      const snapshot = await admin.database().ref('/').once('value');
      const libros = snapshot.val();
      res.json(libros);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener datos de Firebase' });
    }
  });
  

  // app.post('/updatebooks', (req, res) => {
  //   const { id_libro, cantidad } = req.body; // Recupera los datos del cuerpo de la solicitud POST

  //   if (!id_libro || cantidad === undefined) {
  //     res.status(400).json({ error: 'Se requiere un id_libro y una cantidad válida.' });
  //     return;
  //   }

  //   db.query('UPDATE libro SET cantidad = cantidad + ? WHERE id_libro = ?', [cantidad, id_libro], (err, results) => {
  //     if (err) {
  //       console.error(err);
  //       res.status(500).json({ error: 'Error al actualizar la cantidad en la base de datos' });
  //     } else {
  //       res.json(results);
  //     }
  //   });
  // });



  app.listen(port, () => {
    console.log(`La API REST está escuchando en el puerto ${port}`);
  });
