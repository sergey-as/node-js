const RetroCar = require('../dataBase/RetroCar');

module.exports = {
    createRetroCarMiddleware: async (req, res, next) => {
        try {
            const retroCarByBrand = await RetroCar.findOne({brand: req.body.brand});

            if (retroCarByBrand) {
                throw new Error('Such  RetroCar already exists');
            }

            if (req.body.year < 1885 || req.body.year > 1980) {
                throw new Error('YEAR must be between 1885 and 1980!');
            }

            if (req.body.price <= 0) {
                throw new Error('PRICE must be greater than zero!');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
