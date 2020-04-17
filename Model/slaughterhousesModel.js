
const Slaughterhouse = sequelize.define('slaughterhouses', {
    Id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = Slaughterhouse