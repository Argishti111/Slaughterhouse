
const User = sequelize.define('users', {
    Id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = User