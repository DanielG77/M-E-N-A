const Concierto = require('../models/Concierto');

function buildFilter(query) {
  const filter = {};

  if (query.q) {
    const regex = new RegExp(query.q, 'i');
    filter.$or = [{ titulo: regex }, { artista: regex }, { lugar: regex }];
  }

  if (query.genero) {
    filter.genero = query.genero;
  }

  if (query.minPrecio) {
    filter.precio = { $gte: Number(query.minPrecio) };
  }

  if (query.maxPrecio) {
    filter.precio = { ...(filter.precio || {}), $lte: Number(query.maxPrecio) };
  }

  return filter;
}

exports.listar = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sortBy = 'fecha', order = 'asc' } = req.query;
    const filter = buildFilter(req.query);
    const skip = (Number(page) - 1) * Number(limit);

    const items = await Concierto.find(filter)
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Concierto.countDocuments(filter);

    res.json({
      success: true,
      data: items,
      meta: { total, page: Number(page), limit: Number(limit) }
    });
  } catch (err) {
    next(err);
  }
};

exports.obtener = async (req, res, next) => {
  try {
    const item = await Concierto.findOne({ slug: req.params.slug });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Concierto no encontrado' });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.crear = async (req, res, next) => {
  try {
    const nuevo = new Concierto(req.body);
    const saved = await nuevo.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, errors: messages });
    }
    next(err);
  }
};

exports.actualizar = async (req, res, next) => {
  try {
    const { slug, ...data } = req.body;
    const concierto = await Concierto.findById(req.params.id);

    if (!concierto) {
      return res.status(404).json({ success: false, message: 'Concierto no encontrado' });
    }

    if (data.titulo && data.titulo !== concierto.titulo) {
      concierto.slug = null;
    }

    for (let key in data) {
      concierto[key] = data[key];
    }

    const updated = await concierto.save();

    res.json({ success: true, data: updated });

  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, errors: messages });
    }
    next(err);
  }
};



exports.borrar = async (req, res, next) => {
  try {
    const deleted = await Concierto.findOneAndDelete({ slug: req.params.slug });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Concierto no encontrado' });
    }
    res.json({ success: true, data: deleted });
  } catch (err) {
    next(err);
  }
};
