const {User} = require('../dataBase');

module.exports = {
    getAllUsers: (query = {}) => {
        const {
            perPage = 10,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;

        const findObject = {};
        const ageFilter = {};

        Object.keys(filters)
            .forEach((filterParam) => {
                switch (filterParam) {
                    case 'name':
                        const namesStr = filters.name
                            .split(';')
                            .map(name => '^' + name)
                            .join('|');
                        const pattern = new RegExp(`${namesStr}`, 'i');

                        findObject.name = {$in: pattern};
                        break;
                    case 'role':
                        const rolesArr = filters.role.split(';');

                        findObject.role = {$in: rolesArr};
                        break;
                    case 'age.gte':
                        Object.assign(ageFilter, {$gte: +filters['age.gte']});
                        break;
                    case 'age.lte':
                        Object.assign(ageFilter, {$lte: +filters['age.lte']});
                        break;
                }
            });

        if (Object.values(ageFilter).length) {
            findObject.age = ageFilter;
        }

        const orderBy = order === 'asc' ? -1 : 1;

        return User
            .find(findObject)
            .sort({[sortBy]: orderBy})
            .limit(+perPage)
            .skip((page - 1) * perPage);
    }
};
