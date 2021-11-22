module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */

        await queryInterface.addColumn('lesson2', 'xxx', {type: Sequelize.DataTypes.STRING});
    },

    // down: async (queryInterface, Sequelize) => {
    down: async (queryInterface) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */

        await queryInterface.removeColumn('lesson2', 'xxx');
    }
};
