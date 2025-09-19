require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const conciertosRoutes = require('./routes/conciertos');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/conciertosdb';

// Middlewares de seguridad
app.use(
  helmet({
    contentSecurityPolicy: false,       // Desactiva CSP para API JSON
    crossOriginEmbedderPolicy: false    // Opcional, evita conflictos con frontend
  })
);

// Middleware para parsear JSON
app.use(express.json());

// Configuración de CORS
const allowedOrigins = ['http://localhost:4200', 'http://localhost:3000'];
app.use(
  cors({
    origin: function(origin, callback){
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        return callback(new Error('CORS policy: acceso denegado para ' + origin), false);
      }
      return callback(null, true);
    }
  })
);

// Rutas de la API
app.use('/api/conciertos', conciertosRoutes);

// Middleware centralizado de errores
app.use(errorHandler);

// Conexión a MongoDB y arranque del servidor
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
  })
  .catch(err => {
    console.error('Error conectando a MongoDB:', err.message);
    process.exit(1);
  });
