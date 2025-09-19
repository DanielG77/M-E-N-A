const mongoose = require('mongoose');


const ConciertoSchema = new mongoose.Schema({
titulo: { type: String, required: [true, 'El título es obligatorio'], trim: true },
artista: { type: String, required: [true, 'El artista es obligatorio'], trim: true },
lugar: { type: String, required: [true, 'El lugar es obligatorio'], trim: true },
fecha: { type: Date, required: [true, 'La fecha es obligatoria'] },
precio: { type: Number, required: [true, 'El precio es obligatorio'], min: [0, 'El precio debe ser >=0'] },
asientosDisponibles: { type: Number, default: 0, min: [0, 'No puede ser negativo'] },
genero: { type: String },
descripcion: { type: String },
imagenUrl: { type: String }
}, { timestamps: true });


module.exports = mongoose.model('Concierto', ConciertoSchema);