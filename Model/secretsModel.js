const secrets = sequelize.define('secrets', {
    accessSecret: {
        type: Sequelize.STRING
    },
    refreshSecret: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = secrets