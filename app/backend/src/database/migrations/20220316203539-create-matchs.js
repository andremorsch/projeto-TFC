'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('matchs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      homeTeam: {
        field: 'home_team', // dica thiaguinho
        type: Sequelize.INTEGER,
        references: { model: 'clubs', key: 'id'},
      },
      homeTeamGoals: {
        field: 'home_team_goals',
        type: Sequelize.INTEGER,
      },
      awayTeam: {
        field: 'away_team',
        type: Sequelize.INTEGER,
        references: { model: 'clubs', key: 'id'},
      },
      awayTeamGoals: {
        field: 'away_team_goals',
        type: Sequelize.INTEGER,
      },
      inProgress: {
        field: 'in_progress',
        type: Sequelize.BOOLEAN,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('matchs');
  }
};
