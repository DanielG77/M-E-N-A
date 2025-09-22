const express = require('express');
const router = express.Router();

const controller = require('../controllers/conciertosController');


router.get('/', controller.listar);
router.post('/', controller.crear);
router.get('/:slug', controller.obtener);
router.put('/:slug', controller.actualizar);
router.delete('/:slug', controller.borrar);


module.exports = router;