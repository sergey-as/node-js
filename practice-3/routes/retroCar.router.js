const router = require('express').Router();

const retroCarController = require('../controllers/retrocar.controller');
const retroCarMiddleware = require('../middlewares/retrocar.middleware');

router.get('/', retroCarController.getRetroCars);
router.post('/', retroCarMiddleware.createRetroCarMiddleware, retroCarController.createRetroCar);

router.get('/:car_brand', retroCarController.getRetroCarByBrand);
router.put('/:car_brand', retroCarController.updateRetroCar);
router.delete('/:car_brand', retroCarController.deleteRetroCar);

module.exports = router;
