const Router = require('express');
const {verificarLogin,registrarUsuario,actualizarUsuario} = require('../controllers/userController.js');


const router = Router();


// /users route
router.post('/login', verificarLogin);

router.put('/registrar', registrarUsuario);

router.post('/actualizar', actualizarUsuario);

module.exports = router;