require('dotenv').config();
const mongoose = require('mongoose');
const Concierto = require('../models/Concierto');


const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/conciertosdb';


const sample = [
{ titulo: 'Noche de Rock', artista: 'Los Ruidosos', lugar: 'Estadio Central', fecha: new Date(Date.now()+2592000000), precio:45.5, asientosDisponibles:1200, genero:'Rock', descripcion:'Una noche inolvidable de rock.' },
{ titulo: 'Jazz & Café', artista:'Blue Quartet', lugar:'Teatro La Plaza', fecha:new Date(Date.now()+3888000000), precio:30, asientosDisponibles:200, genero:'Jazz', descripcion:'Tarde de jazz con los mejores standards.' },
{ titulo:'Pop Explosion', artista:'Estrella Nova', lugar:'Arena Metropolitana', fecha:new Date(Date.now()+5184000000), precio:60, asientosDisponibles:5000, genero:'Pop', descripcion:'El tour mundial de Estrella Nova.' },
{ titulo:'Electronica Night', artista:'DJ Pulsar', lugar:'Club 88', fecha:new Date(Date.now()+1296000000), precio:25, asientosDisponibles:400, genero:'Electrónica' },
{ titulo:'Clásicos Sinfónicos', artista:'Orquesta Filarmónica', lugar:'Sala Mayor', fecha:new Date(Date.now()+7776000000), precio:50, asientosDisponibles:800, genero:'Clásica' }
];


mongoose.connect(MONGO_URI, { useNewUrlParser:true, useUnifiedTopology:true }).then(async ()=>{
console.log('Conectado a MongoDB para seed');
await Concierto.deleteMany({});
const created = await Concierto.insertMany(sample);
console.log(`Insertados ${created.length} conciertos.`);
mongoose.disconnect();
}).catch(console.error);