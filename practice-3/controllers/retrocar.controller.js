const RetroCar = require('../dataBase/RetroCar');

module.exports = {
    getRetroCars: async (req, res) => {
        try {
            const retroCars = await RetroCar.find();

            res.json(retroCars);
        } catch (e) {
            res.json(e);
        }
    },

    getRetroCarByBrand: async (req, res) => {
        try {
            const {car_brand} = req.params;
            const retroCar = await RetroCar.findOne({brand: car_brand});

            res.json({retroCar});
        } catch (e) {
            res.json(e);
        }
    },

    createRetroCar: async (req, res) => {
        try {
            const newRetroCar = await RetroCar.create(req.body);

            res.json(newRetroCar).status(201);
        } catch (e) {
            res.json(e);
        }
    },

    updateRetroCar: (req, res) => {
        const {car_brand} = req.params;

        res.json(`UPDATE retroCar ${car_brand}`);
    },

    deleteRetroCar: (req, res) => {
        const {car_brand} = req.params;

        res.json(`DELETE retroCar ${car_brand}`);
    }
};
