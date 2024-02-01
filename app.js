const express = require('express');
const app = express();
const port = process.env.PORT || 8080; // Usamos el puerto proporcionado por Render o el 8080 si no está disponible
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./firebase/bd-harrybooks-firebase-adminsdk-2y5fa-45b36b1738.json');

app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://bd-harrybooks-default-rtdb.firebaseio.com/'
});

app.use(cors()); // Permitimos peticiones de cualquier origen en Render

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

app.listen(port, () => {
  console.log(`La API REST está escuchando en el puerto ${port}`);
});
