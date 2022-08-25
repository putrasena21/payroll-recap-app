module.exports = (sequelize, DataTypes) => {
    const UserHrd = sequelize.define(
        "user_hrd",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            full_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true 
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM('ACTIVE', 'DELETED'),
                defaultValue: 'ACTIVE',
                allowNull: false
            },
            failed_login: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            is_login: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
        },
        {
          timestamps: true,
          createdAt: false, // don't add createdAt attribute
          updatedAt: false,
        }
    );

    const verificationToken = sequelize.define(
        "verification_token",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            token: {
                type: DataTypes.STRING,
                unique: true,
            },
        },
        {
            timestamps: true,
            createdAt: false, // don't add createdAt attribute
        }
    );

    verificationToken.belongsTo( UserHrd, { foreignKey: 'user_id' } );

    return verificationToken;
};