const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const slug = require('slug').default; // PORQUE?

const ConciertoSchema = new mongoose.Schema({
  titulo: { type: String, required: [true, 'El título es obligatorio'], trim: true },
  artista: { type: String, required: [true, 'El artista es obligatorio'], trim: true },
  lugar: { type: String, required: [true, 'El lugar es obligatorio'], trim: true },
  fecha: { type: Date, required: [true, 'La fecha es obligatoria'] },
  precio: { type: Number, required: [true, 'El precio es obligatorio'], min: [0, 'El precio debe ser >=0'] },
  asientosDisponibles: { type: Number, default: 0, min: [0, 'No puede ser negativo'] },
  genero: { type: String },
  descripcion: { type: String },
  imagenUrl: { type: String },
  slug: { type: String, lowercase: true, unique: true, index: true, trim: true }
}, { timestamps: true });

ConciertoSchema.plugin(uniqueValidator, { message: '{PATH} already taken' });

async function generateSlug(doc) {
  const base = slug(doc.titulo || 'concierto', { lower: true });
  let candidate = base;
  let i = 0;

  while (await doc.constructor.exists({ slug: candidate })) { //En caso de que exista añadir un numero al slug
    i++;
    candidate = `${base}-${i}`;
  }
  return candidate;
}

ConciertoSchema.pre('validate', async function (next) {
  try {
    if (!this.slug || this.isModified('titulo')) {
      this.slug = await generateSlug(this);
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Concierto', ConciertoSchema);
